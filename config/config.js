
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    devlopment: {
        username:process.env.DB_UESR_NAME,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        server: process.env.SERVER,
        dialect: process.env.DIALECT,
        logging: true
    },
    production: {
        username:process.env.DB_UESR_NAME,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        server: process.env.SERVER,
        dialect: process.env.DIALECT,
        logging: true
    }
    
}