var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Delivery_Farm"
});



/**
 *
 */
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `SELECT id, category, name, quantity, price, DATE_FORMAT(date, "%Y-%m-%d") as date FROM products`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.json(results);
    });
  });
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const category = req.body.category;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const date = req.body.date;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO products (id, category, name, quantity, price, date) VALUES (NULL, ?, ?, ?, ?, ?);`;
    connection.query(sql, [category, name, quantity,price, date], function (err, results) {
      if (err) throw err;
      const id = results.insertId;
      connection.release();
      res.json({
        success: true,
        id
      });
    });
  });
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `DELETE FROM products WHERE id=?`;
    connection.query(sql, [id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const category = req.body.category;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const date = req.body.date;


  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE products SET category=?, name=?, quantity=?, price=?, date=? WHERE id=?`;
    connection.query(sql, [category, name, quantity, price, date, id ], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

module.exports = router;