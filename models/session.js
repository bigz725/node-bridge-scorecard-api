const mongoose = require("mongoose")
const BoardSchema = require("./board").BoardSchema
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    name: String,
    location: String,
    boards: [BoardSchema],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
})
const Session = mongoose.model('Session', SessionSchema)


module.exports = { SessionSchema, Session}