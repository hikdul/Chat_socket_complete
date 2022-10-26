const User = require('../database/models/users')
const Message = require('../database/models/message')


const userConnect = async (uid) => {
    const user = await User.findById(uid)
    user.online = true
    await user.save()
    return user
}

const userDisconnect = async (uid) => {
    const user = await User.findById(uid)
    user.online = false
    await user.save()
    return user
}

const getUsers = async () => {
    const user = await User.find().sort('-online')
    return user
}

const saveMessage = async (payload) => {
    try {
        const msg = new Message(payload)
        await msg.save()
        return msg
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    userDisconnect,
    userConnect,
    saveMessage,
    getUsers,
}