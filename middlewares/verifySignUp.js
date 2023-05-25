const db = require("../models")
const ROLES = db.ROLES
const User = db.user
const logger = require('../logger').textLogger

checkDuplicateUsernameOrEmail = (req, res, next) => {
    logger.debug('in checkDuplicateUsernameOrEmail')
    User.findOne({ $or: [ { username: req.body.username }, { email: req.body.email }]}).
        then((result) => {
            if (result == null) { 
                logger.info(`Username ${req.body.username} and email ${req.body.email} are unique`); 
                next(); 
                return; 
            }
            var message = "something exists"
            if (result.username === req.body.username) {
                logger.warn(`Username ${req.body.username} exists`) 
                message = "Failed, username exists"
            }
            else if (result.email === req.body.email) {
                logger.warn(`Email ${req.body.email} exists`) 
                message = "Failed, email exists"
            }
            res.status(400).send({message: message})
            return
        }).catch((err) => {
            logger.error(`error in checkDuplicateUsernameOrEmail: ${err}`)
            res.status(500).send({message: err})
            return
        })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        req.body.roles.forEach(role => {
            if(!ROLES.includes(role)) {
                res.status(400).send({
                    message: `Failed, role ${role} does not exist`
                })
                return
            }
        })
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
}

module.exports = verifySignUp