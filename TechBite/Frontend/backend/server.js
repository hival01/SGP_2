/*const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/api/fooditems', (req, res) => {
  db.query('SELECT * FROM menu_items', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/fooditems', (req, res) => {
  const { name, price } = req.body;
  db.query('INSERT INTO menu_items (name, price) VALUES (?, ?)', [name, price], (err, result) => {
    if (err) throw err;
    res.send('Food item added successfully');
  });
});

app.put('/api/fooditems/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query('UPDATE menu_items SET name=?, price=? WHERE id=?', [name, price, id], (err, result) => {
    if (err) throw err;
    res.send('Food item updated successfully');
  });
});

app.post('/api/fooditems', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO menu_items (name, price) VALUES (?, ?)', [name, price], (err, result) => {
      if (err) {
        console.error('Error inserting food item:', err);
        res.status(500).send('Error adding food item');
      } else {
        res.send('Food item added successfully');
      }
    });
  });
  

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*/

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup'
});

connection.connect();

// Get all food items
app.get('/api/food', (req, res) => {
  connection.query('SELECT * FROM food', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Add a new food item
app.post('/api/food', (req, res) => {
  const { name, price } = req.body;
  connection.query('INSERT INTO food (name, price) VALUES (?, ?)', [name, price], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Food item added successfully' });
  });
});

// Delete a food item
app.delete('/api/food/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM food WHERE id = ?', [id], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: 'Food item deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

