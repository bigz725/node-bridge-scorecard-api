const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    password: String,
    salt: {
        type: String,
        index: true
    },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    roles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
        }
    ],}, 
    { 
        timestamps: true
    })
const User = mongoose.model("User", UserSchema)
module.exports = User