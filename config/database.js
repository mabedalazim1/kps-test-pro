const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || "test"

const config = require('./config')[env]

module.exports = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.server,
        dialect: "mssql",
        dialectOptions: {
            options: {
                //instanceName: 'SQLEXPRESS', // For SQLEXPRESS If Not Del It
                encrypt: false,
                enableArithAbort: false
            }
        },
        logging: false
    }
)
