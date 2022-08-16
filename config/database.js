const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

module.exports = new Sequelize(process.env.DB_DBName, process.env.DB_User, process.env.DB_PW, {
  host: process.env.DB_Host,
  dialect: "postgres",
  operatorsAliases: false,
  ssl: {
    rejectUnauthorized: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
