const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || "devlopment"

const config = require('./config')[env]

module.exports = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.server,
        dialect: "mssql",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        logging:false
    }
)
