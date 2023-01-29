const chai = require('chai');
const expect = chai.expect
const mongoose = require('mongoose')
const Board = require('../../../models/board')

describe('Board', function() {
    describe('crud', function() {
        before(function() {
            mongoose.connect('mongodb://localhost/bridge_scorecard_api')
            const db = mongoose.connection
            db.on('error', console.error.bind(console, 'connection error'))
            db.once('open', function() {
                //console.log('connected to database')
            })
        })
        afterEach(async function() {
            await mongoose.connection.collections.boards.drop()
        })
        describe('create', function() {
            it('should save', async function() {
                var board = new Board({boardNumber: 1})
                await board.save()
                expect(board.isNew).to.be.false
            })
        })
        describe('update and delete', function() {
            var board 
            this.beforeEach(async function() {
                board = new Board({boardNumber: 1})
                await board.save()
            })

            it('should update', async function() {
                board.contract = '3nn'
                await board.save()
                lookedUpBoard = await Board.findOne({ _id: board.id })
                expect(lookedUpBoard.contract).to.eql('3nn')                
            })

            it('should delete', async function() {
                await board.delete()
                count = await Board.count()
                expect(count).to.eq(0)
            })

        })
    })
})