let express = require("express");
let router = new express.Router();
let {CheckNameTable}= require('./../middlewares/index');
let {createTable,getAllTable}= require('./../src/tables/Controllers');
router.post("/table",CheckNameTable,createTable);
router.get("/table",getAllTable);

module.exports = router;