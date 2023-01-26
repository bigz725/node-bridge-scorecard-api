const mongooseConnect = require('../../helpers/mongoose-config')
const mongoose = require('mongoose')

let basicSetup = () => {
    before((done) =>{
        mongooseConnect.dbconnect()
           .once('open', ()=> {console.log('db connected'); done(); } )
           .on('error', (error) => {console.error(`db error: ${error}`); done(error);})
    })
    beforeEach((done)=> {
        const collectionName = boards
        mongoose.connection.db.listCollections({name: 'boards'})
        .next((error,collection)=>{
            if (collection){
                mongoose.connection.db.dropCollection("boards")
                .then(() => done())
                .catch((err) => done(err))
            }
            else{
                done(error)
            }
        })
    })

    after((done)=>{
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err))
    })
}

module.exports = basicSetup