const express = require('express')
const app = new express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000
var corsOptions = {
    origin: `http://localhost:${port}`
}
app.use(cors(corsOptions))

const mongooseConnect = require('./helpers/mongoose-config')
var mongoose = mongooseConnect.dbconnect()
        .on('error', (err) => console.error("connection to db failed"))

const db = require("./models")
//const Role = db.role
db.initial()


app.get('/', (req, res) => {
    res.json({message: "Hello world."})
})
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)


app.listen(port, () => {
    console.log(`App listening on port ${port}` )
})
