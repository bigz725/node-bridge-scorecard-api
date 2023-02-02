const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role