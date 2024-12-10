const express = require("express");
const cors = require("cors");
const conn = require("./database.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const initDB = () => {
    const sqlCreate = `CREATE TABLE IF NOT EXISTS registration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(255),
        email VARCHAR(50),
        phno varchar(50)
    )`;

    conn.query(sqlCreate, (err) => {
        if (err) console.error("Table creation error:", err.message);
        else console.log("Table ready");
    });
};

initDB();

// Register Endpoint
app.post("/register", (req, res) => {
    const { username, password, email, phono } = req.body;


    // Insert into Database
    const sqlInsert = `INSERT INTO registration (username, password, email, phno) VALUES (?, ?, ?, ?)`;

    conn.query(sqlInsert, [username, password, email, phono], (err, info) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ data: info });
    });
});

// Server Start
const port = 3001;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
