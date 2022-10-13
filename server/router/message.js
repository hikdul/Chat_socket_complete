
const {Router} = require('express')
const { listMessage } = require('../controller/message.controller')
const { validJWT } = require('../middlewares/jwt')

const router = Router()

router.get( '/:id', [validJWT], listMessage)

module.exports = router