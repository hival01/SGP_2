// /*const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const app = express();
// app.use(cors());
// app.use(express.json())



// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "sgp-2"
// })

// app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO login (name, email, password) VALUES ?";
//     const values = [
//         [req.body.name, req.body.email, req.body.password]
//     ];

//     db.query(sql, [values], (err, result) => {
//         if (err) {
//             console.error('Error executing MySQL query: ' + err.stack);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         return res.status(200).json({ message: 'Signup successful' });
//     });
// });


// app.post('/login', (req, res) => {
//     const { name, email, password } = req.body;
//     const sql = "select  * from login where `email`= ? AND `password` = ?";
//     db.query(sql, [email, password], (err, data) => {
//         if (err) {

//             return res.json("Error");
//         }
//         if (data.length > 0) {
//             return res.json("Success");
//         }
//         else
//             return res.json("Fail");
//     })
// })


// app.listen(8080, () => {
//     console.log("listening");
// })*/

// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bodyParser = require('body-parser');

// const app = express();
// const port = 8080;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "sgp-2"
// };

// const pool = mysql.createPool(dbConfig);

// /*app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO login (name, email, password) VALUES ?";
//     const values = [
//         [req.body.name, req.body.email, req.body.password]
//     ];

//     pool.query(sql, [values], (err, result) => {
//         if (err) {
//             console.error('Error executing MySQL query: ' + err.stack);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         return res.status(200).json({ message: 'Signup successful' });
//     });
// });*/

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
//     pool.query(sql, [email, password], (err, data) => {
//         if (err) {
//             console.error('Error executing MySQL query: ' + err.stack);
//             return res.json("Error");
//         }
//         if (data.length > 0) {
//             return res.json("Success");
//         } else {
//             return res.json("Fail");
//         }
//     });
// });

// app.get('/menu', (req, res) => {
//     const tables = ['salads', 'soup', 'chapati', 'rice', 'paneer', 'dal', 'biryani'];
//     const menu = {};

//     const fetchTableData = (tableName, callback) => {
//         pool.query(`SELECT * FROM ${tableName}`, (error, results) => {
//             if (error) {
//                 console.error(`Error fetching data from table ${tableName}:`, error);
//                 return callback(error);
//             }
//             menu[tableName] = results;
//             callback();
//         });
//     };

//     let fetchedTablesCount = 0;
//     tables.forEach(tableName => {
//         fetchTableData(tableName, (error) => {
//             if (error) {
//                 console.error(`Error fetching data from table ${tableName}:`, error);
//             }
//             fetchedTablesCount++;
//             if (fetchedTablesCount === tables.length) {
//                 res.json(menu);
//             }
//         });
//     });
// });

// app.post('/order/:tableNumber', (req, res) => {
//     const { tableNumber } = req.params;
//     const { items } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//         return res.status(400).json({ error: 'Invalid items in the order.' });
//     }

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error connecting to database:', err);
//             return res.status(500).json({ error: 'Database connection error.' });
//         }

//         connection.beginTransaction((transactionErr) => {
//             if (transactionErr) {
//                 console.error('Error beginning transaction:', transactionErr);
//                 return res.status(500).json({ error: 'An error occurred while placing the order.' });
//             }

//             items.forEach((item) => {
//                 const { itemName, price, quantity } = item;

//                 connection.query(
//                     `INSERT INTO tb_${tableNumber} (item_name, price, quantity) VALUES (?, ?, ?)`,
//                     [itemName, price, quantity],
//                     (error) => {
//                         if (error) {
//                             console.error('Error placing order for item:', error);
//                             return connection.rollback(() => {
//                                 res.status(500).json({ error: 'An error occurred while placing the order.' });
//                             });
//                         }
//                     }
//                 );
//             });

//             connection.commit((commitErr) => {
//                 if (commitErr) {
//                     console.error('Error committing transaction:', commitErr);
//                     return connection.rollback(() => {
//                         res.status(500).json({ error: 'An error occurred while placing the order.' });
//                     });
//                 }

//                 connection.release();
//                 res.json({ message: 'Order placed successfully.' });
//             });
//         });
//     });
// });

// app.get('/kitchen/orders', (req, res) => {
//     const orders = [];

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error connecting to database:', err);
//             return res.status(500).json({ error: 'Database connection error.' });
//         }

//         for (let i = 1; i <= 5; i++) {
//             const tableName = `tb_${i}`;
//             connection.query(`SELECT item_name, price FROM ${tableName} WHERE status='Pending'`, (error, results) => {
//                 if (error) {
//                     console.error(`Error fetching orders from ${tableName}:`, error);
//                     return;
//                 }
//                 orders.push({ tableNumber: i, items: results });
//                 if (orders.length === 5) {
//                     res.json(orders);
//                     connection.release();
//                 }
//             });
//         }
//     });
// });

// app.post('/kitchen/updateStatus', (req, res) => {
//     const { tableNumber, item_name } = req.body;
//     const tableName = `tb_${tableNumber}`;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('Error connecting to database:', err);
//             return res.status(500).json({ error: 'Database connection error.' });
//         }

//         connection.query(
//             'UPDATE ?? SET status = ? WHERE item_name = ?',
//             [tableName, 'Completed', item_name],
//             (error) => {
//                 connection.release();
//                 if (error) {
//                     console.error(`Error updating status for ${item_name} in ${tableName}:`, error);
//                     return res.status(500).json({ error: `Error updating status for ${item_name}.` });
//                 }
//                 res.json({ message: 'Status updated successfully.' });
//             }
//         );
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "sgp-2"
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

//Manager get order deatils
app.get('/manager/:tableNumber', (req, res) => {
    const { tableNumber } = req.params;
  
    const tableName = `table${tableNumber}`;
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({ error: 'Database connection error.' });
      }
  
      connection.query(`SELECT * FROM ${tableName}`, (error, results) => {
        connection.release(); // Release the connection
  
        if (error) {
          console.error(`Error fetching data from ${tableName}:`, error);
          return res.status(500).json({ error: An `error occurred while fetching data from ${tableName}.` });
        }
  
        res.json(results);
      });
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
            connection.query(`SELECT item_name, price FROM ${tableName} WHERE status='Pending'`, (error, results) => {
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
            return res.status(500).json({ error:` Error updating status for ${item_name}.` });
          }
          res.json({ message: 'Status updated successfully.' });
        }
      );
    });
  });
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
