const mongoose = require("mongoose")
const BoardSchema = require("./board").BoardSchema
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    name: String,
    location: String,
    boards: [BoardSchema],
    date: Date,
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    linkedSessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
    scoringType: {
        type: String,
        enum: ['MP', 'IMP']
    },
    shouldUseVictoryPoints: {type: Boolean, default: false},
    victoryPoints: Number
}, { timestamps: true }
)
const Session = mongoose.model('Session', SessionSchema)


module.exports = { SessionSchema, Session}