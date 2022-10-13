const { validationResult } = require("express-validator")

const fieldValid = (req, res, next) =>{

    const errs = validationResult(req)
        
    if(errs.errors.length > 0)
        return res.status(400).json({
            ok: false,
            errors: errs.errors
        })
    next()
}

module.exports = fieldValid