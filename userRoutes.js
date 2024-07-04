
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Jade', // Replace with your MySQL username
    password: '2004', // Replace with your MySQL password
    database: 'pinkpenguin'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('MySQL connected...');
});

// Register route
router.post('', async (req, res) => {
    const { name, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO pinkpenguin (name, phone, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, phone, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err.message);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ msg: 'User already exists' });
                }
                return res.status(500).json({ msg: 'Server error' });
            }
            res.status(201).json({ msg: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error hashing password:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
