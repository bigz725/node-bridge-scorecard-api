const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.user = require('./user')
db.role = require('./role')
db.board = require('./board')
Role=db.role

db.ROLES = ["user", "admin"]

db.initial = function () {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({name: 'user'}).save(err => { if(err) console.log("error", err)})
            console.log("added 'user' to roles collection")
            new Role({name: 'admin'}).save(err => { if(err) console.log("error", err)})
            console.log("added 'admin' to roles collection")
        }
    })
}

module.exports = db