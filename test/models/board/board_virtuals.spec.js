const chai = require('chai');
const expect = chai.expect

const Board = require('../../../models/board')

describe('board', function() {
    describe('virtuals', function() {
        const b = new Board({boardNumber: 1, contract: '3nw', we: 400})
        describe('they', function() {
            it('should be the inverse of \'we\'', function() {
                expect(b.they, 'this.they() == -this.we should be true').to.equal(-b.we)
            })
        })

        describe('level', function() {
            it("should be based on the contract string", function() {
                expect(b.level, 'this.level == 3 should be true').to.equal(3)
            })
        })

        describe('strain', function() {
            it('should be based on the contract string', function() {
                expect(b.strain, 'this.strain == \'n\' should be true').to.equal('n')
            })
        })

        describe('declarer', function() {
            it('should be based on the contract string', function() {
                expect(b.declarer, 'this.declarer == \'w\' should be true').to.equal('w')
            })
        })
        describe('doubled/redoubled', function() {
            it('should be based on the contract string 3nw', function() {
                expect(b.doubled, 'this.doubled should be false').to.be.false
                expect(b.redoubled, 'this.redoubled shgould be false').to.be.false
            })
            it('doubled should be based on the contract string 3nwx', function() {
                b.contract = '3nxw'
                expect(b.doubled, 'this.doubled should be true').to.be.true
                expect(b.redoubled, 'this.redoubled shgould be false').to.be.false
            })
            it('redoubled should be based on the contract string 3nwxx', function() {
                b.contract = '3nxxw'
                expect(b.redoubled, 'this.redoubled should be true').to.be.true
                expect(b.doubled, 'this.doubled shgould be false').to.be.false
            })
        })

        describe('theyPercentage', function() {
            it('should be the percentage inverse of wePercentage', function() {
                b.wePercentage = 50.5
                expect(b.theyPercentage, 'this.theyPercentage == 100 - this.wePercentage should be true').to.eq(100.0 - b.wePercentage)
            })
        })

        describe('theyImps', function() {
            it('should be the inverse of \'weImps\'', function() {
                b.weImps = 5
                expect(b.theyImps, 'this.theyImps == -this.weImps should be true').to.equal(-b.weImps)
            })
        })

    })
})
    