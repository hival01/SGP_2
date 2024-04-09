
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3007;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "sgp-2",
  port: 3307
};

const pool = mysql.createPool(dbConfig);

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  pool.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

// signup
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES ?";
  const values = [
    [req.body.name, req.body.email, req.body.password]
  ];

  pool.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Signup successful' });
  });
});

// Endpoint to fetch menu items
app.get('/menu', (req, res) => {
  const tables = ['salads', 'soup', 'chapati', 'rice', 'paneer', 'dal', 'biryani'];
  const menu = {};

  const fetchTableData = (tableName, callback) => {
    pool.query(`SELECT * FROM ${tableName}`, (error, results) => {
      if (error) {
        console.error(`Error fetching data from table ${tableName}:`, error);
        return callback(error);
      }
      menu[tableName] = results;
      callback();
    });
  };

  let fetchedTablesCount = 0;
  tables.forEach(tableName => {
    fetchTableData(tableName, (error) => {
      if (error) {
        console.error(`Error fetching data from table ${tableName}:`, error);
      }
      fetchedTablesCount++;
      if (fetchedTablesCount === tables.length) {
        res.json(menu);
      }
    });
  });
});

// Endpoint to place an order
app.post('/order/:tableNumber', (req, res) => {
  const { tableNumber } = req.params;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid items in the order.' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Database connection error.' });
    }

    connection.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error('Error beginning transaction:', transactionErr);
        return res.status(500).json({ error: 'An error occurred while placing the order.' });
      }

      const insertItemQuery = 'INSERT INTO ?? (item_name, price, quantity) VALUES (?, ?, ?)';
      let queriesCompleted = 0;

      items.forEach((item) => {
        const { itemName, price, quantity } = item;

        // Check if price is provided and is a valid number
        if (price === null || isNaN(price)) {
          return res.status(400).json({ error: 'Invalid price for an item.' });
        }

        connection.query(
          insertItemQuery,
          [`tb_${tableNumber}`, itemName, price, quantity],
          (error) => {
            if (error) {
              console.error('Error placing order for item:', error);
              return connection.rollback(() => {
                res.status(500).json({ error: 'An error occurred while placing the order.' });
              });
            }
            queriesCompleted++;
            if (queriesCompleted === items.length) {
              connection.commit((commitErr) => {
                if (commitErr) {
                  console.error('Error committing transaction:', commitErr);
                  return connection.rollback(() => {
                    res.status(500).json({ error: 'An error occurred while placing the order.' });
                  });
                }
                connection.release();
                res.json({ message: 'Order placed successfully.' });
              });
            }
          }
        );
      });
    });
  });
});

// Endpoint to fetch pending orders from the kitchen
app.get('/kitchen/orders', (req, res) => {
  const orders = [];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Database connection error.' });
    }

    for (let i = 1; i <= 5; i++) {
      const tableName = `tb_${i}`;
      connection.query(`SELECT item_name ,Quantity FROM ${tableName} WHERE status='Pending'`, (error, results) => {
        if (error) {
          console.error(`Error fetching orders from ${tableName}:`, error);
          return;
        }
        orders.push({ tableNumber: i, items: results });
        if (orders.length === 5) {
          res.json(orders);
          connection.release();
        }
      });
    }
  });
});

// Endpoint to update the status of an order in the kitchen
app.post('/kitchen/updateStatus', (req, res) => {
  const { tableNumber, item_name } = req.body;
  const tableName = `tb_${tableNumber}`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Database connection error.' });
    }

    connection.query(
      'UPDATE ?? SET status = ? WHERE item_name = ?',
      [tableName, 'Completed', item_name],
      (error, results) => {
        connection.release(); // Release the connection
        if (error) {
          console.error(`Error updating status for ${item_name} in ${tableName}:`, error);
          return res.status(500).json({ error: ` Error updating status for ${item_name}.` });
        }
        res.json({ message: 'Status updated successfully.' });
      }
    );
  });
});

// edit
app.post('/add-item', (req, res) => {
  const { tableName, itemName, price } = req.body;

  // Check if the item already exists in the table
  const selectQuery = `SELECT item_name,price FROM ${tableName} WHERE item_name = ?`;
  pool.query(selectQuery, [itemName], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error checking if item exists:', selectErr);
      res.status(500).send('Error checking if item exists');
      return;
    }

    // If the item exists, return an error
    if (selectResult.length > 0) {
      res.status(400).send('Item already exists in the database');
      return;
    }

    // If the item does not exist, insert it into the table
    const insertQuery = `INSERT INTO ${tableName} (item_name, price) VALUES (?, ?)`;
    pool.query(insertQuery, [itemName, price], (insertErr, result) => {
      if (insertErr) {
        console.error('Error adding item:', insertErr);
        res.status(500).send('Error adding item');
      } else {
        console.log('Item added successfully');
        res.status(200).send('Item added successfully');
      }
    });
  });
});

// Endpoint to remove an item from the specified table
app.post('/remove-item', (req, res) => {
  const { tableName, itemName } = req.body;
  const sql = `DELETE FROM ${tableName} WHERE item_name = ?`;
  pool.query(sql, itemName, (err, result) => {
    if (err) {
      console.error('Error removing item:', err);
      res.status(500).send('Error removing item');
    } else {
      if (result.affectedRows === 0) {
        res.status(400).json({ error: 'Item not found in the database.' });
      } else {
        console.log('Item removed successfully');
        res.status(200).send('Item removed successfully');
      }
    }
  });
});

//Manager module 
// Endpoint to fetch data for a specific table
app.get('/orders/:tableNumber', (req, res) => {
  const { tableNumber } = req.params;
  const tableName = `tb_${tableNumber}`;
  const sql = `SELECT * FROM ${tableName}`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.put('/update-item-quantity', (req, res) => {
  const { tableName, itemName, newQuantity } = req.body;

  // Query to update the quantity of the item in the table
  const sql = `UPDATE ${tableName} SET Quantity = ? WHERE item_name = ?`;

  // Execute the query with the new quantity and item name as parameters
  pool.query(sql, [newQuantity, itemName], (err, result) => {
    if (err) {
      console.error('Error updating item quantity:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Item quantity updated successfully' });
    }
  });
});

// new
// Route to generate bill for a table
app.post('/generate-bill', (req, res) => {
  const { tableNumber } = req.body;
  const tableName = `tb_${tableNumber}`;

  // Query to fetch items for the specified table
  const sql = `SELECT item_name, Price, Quantity FROM ${tableName} WHERE Status = 'Completed'`;

  // Execute the query
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error generating bill:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Calculate the total amount
      const totalAmount = results.reduce((total, item) => total + (item.Price * item.Quantity), 0);
      // Send the bill details along with the total amount as JSON response
      res.json({ tableNumber, items: results, totalAmount });
    }
  });
});

// Route to remove an item by its name
app.post('/remove-item', (req, res) => {
  const { tableName, itemName } = req.body;

  // Query to remove the item from the table
  const sql = `DELETE FROM ${tableName} WHERE item_name = ?`;

  // Execute the query with the item name as a parameter
  pool.query(sql, [itemName], (err, result) => {
    if (err) {
      console.error('Error removing item:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Item removed successfully' });
    }
  });
});

//Extra
app.get('/menu', (req, res) => {
  const sql = `SHOW TABLES`;
  pool.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching menu:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      const tables = results.map(result => result[`Tables_in_${dbConfig.database}`]);
      const menu = {};

      const fetchTableData = (tableName, callback) => {
          pool.query(`SELECT * FROM ${tableName}`, (error, results) => {
              if (error) {
                  console.error(`Error fetching data from table ${tableName}:`, error);
                  return callback(error);
              }
              menu[tableName] = results;
              callback();
          });
      };

      let fetchedTablesCount = 0;
      tables.forEach(tableName => {
          fetchTableData(tableName, (error) => {
              if (error) {
                  console.error(`Error fetching data from table ${tableName}:`, error);
              }
              fetchedTablesCount++;
              if (fetchedTablesCount === tables.length) {
                  res.json(menu);
              }
          });
      });
  });
});

app.post('/create-table', (req, res) => {
  const { tableName } = req.body;
  const createTableQuery = `CREATE TABLE ${tableName} (item_name VARCHAR(255), Price FLOAT)`;
  pool.query(createTableQuery, (err, result) => {
      if (err) {
          console.error('Error creating table:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      console.log('Table created successfully');
      res.status(200).send('Table created successfully');
  });
});

app.post('/add-item', (req, res) => {
  const { tableName, itemName, price } = req.body;
  const insertQuery = `INSERT INTO ${tableName} (item_name, Price) VALUES (?, ?)`;
  pool.query(insertQuery, [itemName, price], (err, result) => {
      if (err) {
          console.error('Error adding item:', err);
          res.status(500).send('Error adding item');
      } else {
          console.log('Item added successfully');
          res.status(200).send('Item added successfully');
      }
  });
});

app.post('/remove-item', (req, res) => {
  const { tableName, itemName } = req.body;
  const sql = `DELETE FROM ${tableName} WHERE item_name = ?`;
  pool.query(sql, itemName, (err, result) => {
      if (err) {
          console.error('Error removing item:', err);
          res.status(500).send('Error removing item');
      } else {
          if (result.affectedRows === 0) {
              res.status(400).json({ error: 'Item not found in the database.' });
          } else {
              console.log('Item removed successfully');
              res.status(200).send('Item removed successfully');
          }
      }
  });
});

app.post('/update-item', (req, res) => {
  const { tableName, itemName, newPrice } = req.body;
  const sql = `UPDATE ${tableName} SET Price = ? WHERE item_name = ?`;
  pool.query(sql, [newPrice, itemName], (err, result) => {
      if (err) {
          console.error('Error updating item:', err);
          res.status(500).send('Error updating item');
      } else {
          console.log('Item updated successfully');
          res.status(200).send('Item updated successfully');
      }
  });
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
