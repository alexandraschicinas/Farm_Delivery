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
 * run this before first USAGE to create teams TABLE
 */
router.get("/install", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS invoices 
    (
      id INT NOT NULL AUTO_INCREMENT, 
      invoiceId INT NOT NULL, 
      product INT NOT NULL, 

      PRIMARY KEY (id)
      ) ENGINE = InnoDB;
    `;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      connection.release();
      res.redirect("/");
    });
  });
});

/**
 *
 */
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `SELECT id, invoiceId, product FROM invoiceProduct`;
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
  const id = req.body.id;
  const invoiceId = req.body.invoiceId;
  const product = req.body.product;


  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO invoiceProducts (id, invoiceId, product  ) VALUES (NULL, ?, ?, ?);`;
    connection.query(sql, [invoiceId, product], function (err, results) {
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
    const sql = `DELETE FROM invoiceProducts WHERE id=?`;
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
    const invoiceId = req.body.invoiceId;
    const product = req.body.product;
  
  

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE invoiceProducts SET invoiceId = ?, product = ?  WHERE id=?`;
    connection.query(sql, [invoiceId, product, id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

module.exports = router;
