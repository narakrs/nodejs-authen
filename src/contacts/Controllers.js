let express = require("express");
let router = new express.Router();
var mysql = require('mysql');
var options = require('./../../config/database');
var con = mysql.createConnection(options);
var fun = require('./../functions/function');
router.post("/get", async (req, res, next) => {
  let sql = `SELECT *FROM contacttable WHERE  tableY= '${req.body.name}'`;
  let data = null;
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    else {
      data = result;
      console.log(data);
      return res.status(200).send(data);
    }
  });
});
router.post("/add", async (req, res, next) => {
  let sql = `INSERT INTO  contacttable (tableY, tableX, keyY, keyX) VALUES ('${req.body.tableY}','${req.body.tableX}','${req.body.keyY}','${req.body.keyX}')`;
  let data = req.body;
  let i = 0;
  let keyTable = "";
  for (i; i < data.list.length; i = i + 1) {
    if (data.list[i] !== null) {
      if (typeof data.list[i] === 'number') {
        keyTable = keyTable + data.list[i];
      }
      else {
        keyTable = keyTable + `'${data.list[i]}'`;
      }
      if (i !== data.list.length - 1) {
        keyTable = keyTable + ',';
      }
    }
    else {
      keyTable = keyTable + data.list[i];
      if (i !== data.list.length - 1) {
        keyTable = keyTable + ',';
      }
    }
  }
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) return res.status(200).send(err);
    else {
      data = result;
      console.log(data.insertId);
      let sql2 = `INSERT INTO functiontable (contactid,keyY,number1,number2,number3,number4,number5,keyY1,keyY2,key3,key4,key5) VALUES (${data.insertId},${keyTable})`;
      console.log(sql2);
      con.query(sql2, function (err, result, fields) {
        if (err) return res.status(401).send(err);
        else {
          data = result;
          return res.status(200).send(data);
        }
      });
    }
  });
});

module.exports = router;