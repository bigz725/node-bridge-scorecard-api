const mongoose = require('mongoose')
const DB_uri = process.env.MONGO_URL
mongoose.set('strictQuery', false)

function dbconnect() {
    console.log("connecting to db")
    mongoose.connect(DB_uri, {useNewUrlParser: true})
    console.log("connected")
    return mongoose.connection
}

function dbclose() {
    return mongoose.disconnect()
}

module.exports = {dbconnect, dbclose}
// Mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true}).
//     then(() => {
//         console.log("Connected to database")
//         module.exports = Mongoose
//     }).catch((err) => {
//         console.error("Not connected to database: ", err)
//     }
//     ); 

