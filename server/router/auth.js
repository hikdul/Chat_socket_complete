const {Router} = require('express')
const { check } = require('express-validator')
const { CreateUser, LoginUser, RenewToken } = require('../controller/user.controller')
const fieldValid = require('../middlewares/fieldValid')
const { validJWT } = require('../middlewares/jwt')

const router = Router()

//new user
router.post('/new',[
    check('email', 'el email es obligatorio').isEmail(),
    check('name', 'el nombre es obligatorio').notEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    fieldValid
], CreateUser)

//login user
router.post('/login',[
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    fieldValid
], LoginUser)

// renew token
router.get('/renew',validJWT, RenewToken)

module.exports = router