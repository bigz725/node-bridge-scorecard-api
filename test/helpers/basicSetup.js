const mongooseConnect = require('../../helpers/mongoose-config')
const mongoose = require('mongoose')
const logger = require('../../logger').textLogger

let basicSetup = () => {
    before((done) =>{
        mongooseConnect.dbconnect()
           .once('open', ()=> {logger.info('db connected'); done(); } )
           .on('error', (error) => {logger.error(`db error: ${error}`); done(error);})
    })

    after((done)=>{
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err))
    })
}

module.exports = basicSetup