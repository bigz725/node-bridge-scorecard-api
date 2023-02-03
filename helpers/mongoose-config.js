const mongoose = require('mongoose')
const DB_uri = process.env.MONGO_URL
mongoose.set('strictQuery', false)

function dbconnect() {
    console.log("connecting to db")
    mongoose.connect(DB_uri, {useNewUrlParser: true})
        .then(() => {
            console.log(`Mongoose: Successfully connected to ${mongoose.connection.name} on ${mongoose.connection.host}`)
            return mongoose.connection
        })
        .catch((e) => console.log(`Error connecting: ${e}`))
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

