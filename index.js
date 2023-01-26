const express = require('express')
const app = new express()
require('dotenv').config()
const mongooseConnect = require('./helpers/mongoose-config')
mongooseConnect.dbconnect()
        .on('error', (err) => console.error("connection to db failed"))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}` )
})