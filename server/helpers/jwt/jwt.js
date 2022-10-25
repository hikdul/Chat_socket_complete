const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../config')

const CreateJWT = (uid) => {
    return new Promise((res, rej) => {
        const payload = { uid }
        jwt.sign(payload, JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err)
                rej(err)
            res(token)
        })
    })
}

const VerifyJWT = (token) => {
    try {
        const { uid } = jwt.verify(token, JWT_KEY)
        return [true, uid]
    } catch (error) {
        console.log(error.message)
        return [false, null]
    }
}

module.exports = {
    CreateJWT,
    VerifyJWT
}