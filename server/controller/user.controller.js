const User = require('../database/models/users')
const bcrypt = require('bcryptjs')
const { CreateJWT } = require('../helpers/jwt/jwt')

const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exits = await User.findOne({ email })
        if (exits)
            return res.status(400).json({
                ok: false,
                message: ['correo ya en uso']
            }).end()

        //? si fuera comercial los ideal es enviar un mail con estos datos
        const user = User({ name, email, password })
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        await user.save()

        const jwt = await CreateJWT(user.id)
        return res.status(201).json({ user: { email: user.email, name: user.name, id: user.id }, token: jwt }).end()
    }
    catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}

const LoginUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const userDb = await User.findOne({ email })

        if (!userDb || !bcrypt.compareSync(password, userDb.password))
            return res.status(404).end()
        const { name, id } = userDb
        const jwt = await CreateJWT(userDb.id)
        return res.status(200).json({ user: { id, name, email }, token: jwt })

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}

const RenewToken = async (req, res) => {
    try {
        const { uid } = req

        const userDb = await User.findById(uid)
        const { email, name, id } = userDb

        const token = await CreateJWT(id)
        return res.status(200).json({ user: { email, name, id }, token }).end()
    }
    catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}

module.exports = {
    CreateUser, LoginUser, RenewToken
}
