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
        dialectOptions: {
        options: {  
            encrypt: false,
            enableArithAbort: false
          }
    },
        logging:false
    }
)
