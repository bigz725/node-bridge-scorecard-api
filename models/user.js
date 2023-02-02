const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
        }
    ],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
})
const User = mongoose.model("User", UserSchema)
module.exports = User