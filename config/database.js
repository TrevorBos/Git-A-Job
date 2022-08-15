const Sequelize = require("sequelize");
module.exports = new Sequelize("gitajobdb", "postgres", "Bashi1996", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
