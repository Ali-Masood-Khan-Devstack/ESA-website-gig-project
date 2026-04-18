const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Connect to MySQL using XAMPP defaults
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const PORT = 3000;
app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server running on ${url}`);
    console.log(`\u001b]8;;${url}\u001b\\Click here to open in browser\u001b]8;;\u001b\\`);
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');

    // Create database and table
    db.query("CREATE DATABASE IF NOT EXISTS dbESAvcode", (err) => {
        if (err) throw err;
        db.query("USE dbESAvcode", (err) => {
            if (err) throw err;
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS newsletters (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    subscribe_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            db.query(createTableQuery, (err) => {
                if (err) throw err;
                console.log("Database and Table are ready.");
            });
        });
    });
});

// API Endpoint to handle newsletter subscription
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = "INSERT INTO newsletters (email) VALUES (?)";
    db.query(query, [email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'This email is already subscribed!' });
            }
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Thank you for subscribing!' });
    });
});