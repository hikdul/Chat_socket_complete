const {Router} = require('express')
const { CreateUser, LoginUser, RenewToken } = require('../controller/user.controller')

const router = Router()

//new user
router.post('/new', CreateUser)

//login user
router.post('/login', LoginUser)

// renew token
router.get('/renew', RenewToken)

module.exports = router