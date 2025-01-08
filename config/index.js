const Sequelize = require('sequelize');
const dbconfig = require('./database');

const db = {}

db.Sequelize = Sequelize;
db.sequelize = dbconfig;

module.exports = db
