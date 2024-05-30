const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importar cors
const app = express();

app.use(bodyParser.json());

// Usar el middleware cors
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solo este origen
    methods: ['GET', 'POST'], // Permitir solo estos métodos
    allowedHeaders: ['Content-Type'] // Permitir solo estos encabezados
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/addProduct', (req, res) => {
    const { name, entryDate, price, provider, stockMin, currentStock, maxStock } = req.body;
    console.log(req.body);  // Log the request body to check if the data is being received
    const sql = 'INSERT INTO products (name, entry_date, price, provider, stock_min, current_stock, max_stock) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, entryDate, price, provider, stockMin, currentStock, maxStock], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding product');
        } else {
            res.send('Product added');
        }
    });
});

app.get('/getProducts', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/providerStats', (req, res) => {
    const sql = 'SELECT provider, COUNT(*) as count FROM products GROUP BY provider';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/overStock', (req, res) => {
    const sql = 'SELECT SUM(current_stock - max_stock) as overStock FROM products WHERE current_stock > max_stock';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
