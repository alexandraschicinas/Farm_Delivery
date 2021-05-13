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
  database: "Delivery_Farm",
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
      clientId INT NOT NULL, 
      delivery DATE NOT NULL, 
      date DATE NOT NULL, 

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
    const sql = `SELECT id, clientId, delivery, date FROM invoices`;
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
router.post("/create2", function (req, res, next) {
  const id = req.body.id;
  const invoiceId = req.body.invoiceId;
  const product = req.body.product;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO invoiceProducts (id, invoiceId, product) VALUES (NULL, ?, ? );`;
    connection.query(sql, [invoiceId, product], function (err, results) {
      if (err) throw err;
      const id = results.insertId;
      connection.release();
      res.json({
        success: true,
        id,
      });
    });
  });
});

router.post("/create", function (req, res, next) {
  const clientId = req.body.clientId;
  const delivery = req.body.delivery;
  const products = req.body.products;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO invoices (id, clientId, delivery, date ) VALUES (NULL, ?, ?, now());`;
    connection.query(sql, [clientId, delivery], function (err, results) {
      if (err) throw err;
      const invoiceId = results.insertId;
      const values = products.map((product) => [invoiceId, product]);
      console.log(values);
      const sql = `INSERT INTO invoiceProducts (invoiceId, product) VALUES ?;`;
      connection.query(sql, [values], function (err, results) {
        if (err) throw err;
        connection.release();
        res.json({
          success: true,
          id: invoiceId,
        });
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
    const sql = `DELETE FROM invoices WHERE id=?`;
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
  const clientId = req.body.clientId;
  const delivery = req.body.delivery;
  const date = req.body.date;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE invoices SET clientId = ?, delivery = ?, date = ?  WHERE id=?`;
    connection.query(
      sql,
      [clientId, delivery, date, id],
      function (err, results) {
        if (err) throw err;
        connection.release();
        res.json({ success: true });
      }
    );
  });
});

module.exports = router;
