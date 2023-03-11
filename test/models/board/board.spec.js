const chai = require('chai');
const expect = chai.expect
const mongoose = require('mongoose')
const dbHandler = require('../../helpers/in-memory-handler')
const Board = require('../../../models/board').Board

describe('Board', function() {
    describe('crud', function() {
        before(async () => await dbHandler.connect());

        afterEach(async () => await dbHandler.clearDatabase());

        after(async () => await dbHandler.closeDatabase());

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