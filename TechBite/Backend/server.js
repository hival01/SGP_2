const express = require("express");
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