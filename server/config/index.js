require('dotenv').config()

module.exports = {

    PORT: process.env.PORT,
    CONECCTION_STRING: process.env.MONGODB_CONECCTION_STRING,
    JWT_KEY: process.env.JWT_SECRET_PRIVATE_KEY
}