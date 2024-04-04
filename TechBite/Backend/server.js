/*const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES ?";
    const values = [
        [req.body.name, req.body.email, req.body.password]
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Signup successful' });
    });
});


app.post('/login', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "select  * from login where `email`= ? AND `password` = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {

            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else
            return res.json("Fail");
    })
})


app.listen(8080, () => {
    console.log("listening");
})
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const port = 3007;

app.use(bodyParser.json());

app.use(cors());

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sgp-2', 
  port: 3307 
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Endpoint to fetch orders from all tables
app.get('/kitchen/orders', (req, res) => {
  const orders = [];

  // Fetch orders from each table
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ error: 'Database connection error.' });
    }

    for (let i = 1; i <= 3; i++) { // Assuming 3 tables for demonstration, you can adjust this as needed
      const tableName = `tb_${i}`;
      connection.query(`SELECT item_name, price FROM ${tableName} where status='Pending'`, (error, results) => {
        if (error) {
          console.error(`Error fetching orders from ${tableName}:`, error);
          return;
        }
        orders.push({ tableNumber: i, items: results });
        if (orders.length === 3) { // Assuming 3 tables for demonstration, adjust this if needed
          res.json(orders);
          connection.release(); // Release the connection
        }
      });
    }
  });
});

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
          return res.status(500).json({ error: `Error updating status for ${item_name}.` });
        }
        res.json({ message: 'Status updated successfully.' });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
