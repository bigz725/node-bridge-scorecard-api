const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const logger = require('../logger').textLogger

const db = {}

db.mongoose = mongoose

db.user = require('./user')
db.role = require('./role')
db.boardSchema = require('./board').BoardSchema
db.board = require('./board').Board
db.sessionSchema  = require('./session').SessionSchema
db.session = require('./session').Session
Role=db.role

db.ROLES = ["user", "admin"]

db.initial = async function () {
    count = await Role.estimatedDocumentCount();
    if (count === 0) {
        logger.info("No roles found, adding 'user' and 'admin' to roles collection")
        new Role({name: 'user'}).save(err => { if(err) logger.error(err)})
        logger.info("added 'user' to roles collection")
        new Role({name: 'admin'}).save(err => { if(err) logger.error(err)})
        logger.info("added 'admin' to roles collection")
    }
}

module.exports = db