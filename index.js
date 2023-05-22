const express = require('express')
const app = new express()
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT || 3000

const {consoleRequestLogger, textLogger, buggyLogger} = require('./logger')

app.use( consoleRequestLogger );

require('./routes/')(app)

const cors = require('cors')
let corsOptions = {
    origin: `http://localhost:${port}`
}
app.use(cors(corsOptions)) 
require('./helpers/mongoose-config').dbconnect()

const db = require("./models")
db.initial()

app.listen(port, () => {
    textLogger.info(`App running in ${process.env.NODE_ENV}, listening on port ${port}`)
})

module.exports = app