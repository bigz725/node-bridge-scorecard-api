const mongoose = require("mongoose")
const BoardSchema = require("./board").BoardSchema
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    name: String,
    location: String,
    boards: [BoardSchema],
    date: Date,
    linkedSessions: [this]
}
)
const Session = mongoose.model('Session', SessionSchema)


module.exports = { SessionSchema, Session}