"use strict";

let Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");
// table [extension]
let User = sequelize.define("USERS", {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  name : Sequelize.STRING,
  role: {
    type: Sequelize.ENUM("admin", "customer","staff","management"),
    default:"customer"
  },
}, {
  tableName: "USERS",
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
  User,
};