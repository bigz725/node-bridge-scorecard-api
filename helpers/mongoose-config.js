const mongoose = require('mongoose')
const DB_uri = process.env.MONGO_URL
mongoose.set('strictQuery', false)
const logger = require('../logger').textLogger

function dbconnect() {
    logger.info("connecting to db")
    mongoose.connect(DB_uri, {useNewUrlParser: true})
        .then(() => {
            logger.info(`Mongoose: Successfully connected to ${mongoose.connection.name} on ${mongoose.connection.host}`)
            return mongoose.connection
        })
        .catch((e) => logger.error(`Error connecting: ${e}`))
}

function dbclose() {
    logger.info("Closing Mongoose connection")
    return mongoose.disconnect()
}

module.exports = {dbconnect, dbclose}


