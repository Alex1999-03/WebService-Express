const express = require('express');
const connection = require('../helpers/connection');

const router = express.Router();


router.get('/', (req, res) => {
    let sql = 'SELECT * FROM product';
    connection.query(sql, (err, results, fields) => {
        if(err){
            throw err;
        }
        res.json({products: results});        
    });
});

router.get('/:id', (req, res) => {
    let sql = 'SELECT * FROM product WHERE id = ?';
    let id = req.params.id
    connection.query(sql, id, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json({products: results});
    });
});

router.post('/', (req, res) => {
  
    // let sql = "INSERT INTO product (description, salePrice, purchasePrice, quantity) VALUES (?, ?, ?, ?)";
     // let products = [req.body.description, req.body.salePrice, req.body.purchasePrice, req.body.quantity];

    let sql = "INSERT INTO product set ?";

    let product = req.body;

    connection.query(sql, product, (err, results, fields) => {
        if(err){
            throw err;
        }
        res.json({message: 'A new product has been added.'});
    });
});

router.put('/:id', (req, res) => {
    let sql = "UPDATE product set ? WHERE id = ?";
    let id = req.params.id;
    let product = req.body;

    connection.query(sql, [product, id], (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json({message: 'A new product has been updated.'});
    });
});

router.delete('/:id', (req, res) => {
    let sql = "DELETE FROM product WHERE id = ?";
    let id = req.params.id;
    connection.query(sql, id, (err, results, fields) => {
        if (err){
            throw err;
        }
        res.json({message: 'A new product has been deleted.'});
    });
});

module.exports = router;