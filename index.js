const express = require('express')
const app = new express()
app.use(require('body-parser').json())
require('./routes/')(app)
require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors')
let corsOptions = {
    origin: `http://localhost:${port}`
}
app.use(cors(corsOptions))
require('./helpers/mongoose-config').dbconnect()

const db = require("./models")
db.initial()

app.listen(port, () => {
    console.log(`App listening on port ${port}` )
})

module.exports = app