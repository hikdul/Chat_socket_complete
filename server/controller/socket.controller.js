const User = require('../database/models/users')

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
    const user =  await User.find().sort('-online')
    return user
}

module.exports = {
    userConnect,
    userDisconnect,
    getUsers
}