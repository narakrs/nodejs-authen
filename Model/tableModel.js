"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");

// table [extension]
let Table = sequelize.define("tables", {
  name: Sequelize.STRING,
}, {
  tableName: "tables",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = {
  Table,
};