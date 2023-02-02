const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log('in verifysignup, checkDuplicateUsernameOrEmail')
    User.findOne({ $or: [ { username: req.body.username }, { email: req.body.email }]}).
        then((result) => {
            if (result == null) { console.log('result empty'); next(); return }
            var message = "something exists"
            if (result.username === req.body.username) { message = "Failed, username exists"}
            else if (result.email === req.body.email) { message = "Failed, email exists"}
            console.log('sending 400 from checkDuplicateUsernameOrEmail')
            res.status(400).send({message: message})
            return
        }).catch((err) => {
            console.log(`error in checkDuplicateUsernameOrEmail: ${err}`)
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