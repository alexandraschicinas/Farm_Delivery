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
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;


  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `INSERT INTO teams (id, members, name, url) VALUES (NULL, ?, ?, ?);`;
    connection.query(sql, [members, name, url], function (err, results) {
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
    const sql = `DELETE FROM teams WHERE id=?`;
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
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    const sql = `UPDATE teams SET members=?, name=?, url=? WHERE id=?`;
    connection.query(sql, [members, name, url, id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  });
});

module.exports = router;