const chai = require('chai');
const expect = chai.expect
const mongoose = require('mongoose')
const dbHandler = require('../../helpers/in-memory-handler')
const Session = require('../../../models/session').Session
const Board = require('../../../models/board').Board


describe('Session', function() {
    describe('crud', function() {
        before(async () => await dbHandler.connect());

        afterEach(async () => await dbHandler.clearDatabase());

        after(async () => await dbHandler.closeDatabase());

        describe('save', function() {
            it('saves', async function() {
                let session = new Session({name: 'gold rush', location: 'sheraton'})
                await session.save()
                expect(session.isNew).to.be.false
            })
            it('saves with boards', async function() {
                let boards = [new Board({boardNumber: 1, contract: '3nn'}), new Board({boardNumber: 2, contract: '4ss'})]
                let session = new Session({name: 'sectional', location: 'lawrence', boards: boards})
                await session.save()
                expect(session.isNew).to.be.false
                expect(await Session.countDocuments()).to.eq(1)
            })
        })
    })
})