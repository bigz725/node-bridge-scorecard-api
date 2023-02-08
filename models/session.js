const mongoose = require("mongoose")
const Board = require("./board")
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    name: String,
    location: String,
    boards: [Board],
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