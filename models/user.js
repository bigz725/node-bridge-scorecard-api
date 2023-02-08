const mongoose = require("mongoose")
const Session = require("./session").SessionSchema
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    sessions: [Session],
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