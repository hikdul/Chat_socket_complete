const mongoose = require('mongoose')
const { CONECCTION_STRING } = require('../config')

// esto deberia de venir desde el .env
const Cstr = CONECCTION_STRING

const dbConection = async ()=> {

    try {
        await mongoose.connect(Cstr,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 
        console.log('Db Is Connect. \n')
    } catch (error) {
       console.log(error)
       throw new Error('Error in database. See the log in terminal')
    }
}

module.exports = dbConection