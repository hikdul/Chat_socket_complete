const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')

const validJWT = (req, res, next) =>{
    try {
        const tk = req.header('x-token')
        if(!tk)
            return res.status(401).json({ok:false, message: 'Not Valid Token'})

        const {uid}= jwt.verify(tk,JWT_KEY)
        console.log({uid: uid})
        req.uid = uid
        
        next()
    }
    catch (error)
    {
        console.log(error)
        res.status(401).json({ok:false, message: 'Not Token Valid'})
        
    }
}

module.exports = {
    validJWT
}