let Sequelize = require("sequelize");

let sequelize = new Sequelize("datacategory", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;