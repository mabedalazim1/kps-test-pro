
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
    },
    test: {
        username:process.env.DB_UESR_NAME_B,
        password:process.env.DB_PASSWORD_B,
        database: process.env.DB_DATABASE_B,
        server: process.env.SERVER_B,
        dialect: process.env.DIALECT_B,
        logging: true
    }
    
}