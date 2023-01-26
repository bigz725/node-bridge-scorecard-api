var expect = require('chai').expect;

var Board = require('../../models/board')

describe('board', function() {
    describe('validations', function() {
        describe('for boardNumber', function() {
            it('should be invalid if board number is null', function(done) {
                var b = new Board()
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber is required').to.exist;
                    done();
                })
            })

            it('should be invalid if the board number is less than 1', function(done) {
                var b = new Board({boardNumber: 0})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber < 0 should be invalid').to.exist;
                    done();
                })
            })

            it('should be invalid if the board number is greater than 36', function(done) {
                var b = new Board({boardNumber: 37})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber > 36 should be invalid').to.exist;
                    done();
                })
            })

            it('should be invalid if the board number is not an integer', function(done) {
                var b = new Board({boardNumber: 5.3})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, '5.3 should not be a valid boardNumber').to.exist;
                    done();
                })
            })
        })
        describe('for contract', function() { //♣♦♥♠

            it('allows correct board expressions', function(done) {
                let boardNumber = 1
                levels = ['1', '2', '3', '4', '5', '6', '7']
                suitSymbols = ['♣', '♦', '♥', '♠']
                strainLetters = ['c', 'd', 'h', 's', 'n', 'nt']
                strains = [...suitSymbols, ...strainLetters]
                doubledRedoubled = ['', 'x', 'xx']
                declarer = ['n', 's', 'e', 'w']

                levels.forEach(function(level) {
                    strains.forEach(function(strain) {
                        doubledRedoubled.forEach(function(doubled) {
                            declarer.forEach(function(declarer) {
                                contractString = `${level}${strain}${doubled}${declarer}`
                                var b = new Board({boardNumber: boardNumber, contract: contractString})
                                b.validate(function(err, board) {
                                    expect(err, `${contractString} should be valid`).to.be.null
                                })
                            })
                        })
                    })
                })
                done()
            })
        })
        describe('for we', function() {
            const boardNumber = 1
            it('should be invalid for numbers less than -7600', function(done) {
                var b = new Board({boardNumber: boardNumber, we: -7601})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' can't be less than 7600").to.exist                    
                })
                done()
            })
            it('should be invalid for numbers greater than 7600', function(done) {
                var b = new Board({boardNumber: boardNumber, we: 7601})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' can't be greater than 7600").to.exist                    
                })
                done()
            })
            it('must be an integer', function(done) {
                var b = new Board({boardNumber: boardNumber, we: 420.20})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' must be an integer").to.exist                    
                })
                done()
            })
        })
        describe('for wePercentage', function() {
            it('should be invalid if the value is less than 0', function(done) {
                var b = new Board({boardNumber: 1, wePercentage: -1.5})
                b.validate(function(err) {
                    expect(err?.errors?.wePercentage, 'wePercentage < 0 should be invalid').to.exist;
                    done();
                })
            })

            it('should be invalid if the value is greater than 100', function(done) {
                var b = new Board({boardNumber: 1, wePercentage: 101.01})
                b.validate(function(err) {
                    expect(err?.errors?.wePercentage, 'wePercentage > 100 should be invalid').to.exist;
                    done();
                })
            })
        })
        describe('for weImps', function() {
            it('should be invalid if the value is less than 0', function(done) {
                var b = new Board({boardNumber: 1, weImps: -1})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, 'wePercentage < 0 should be invalid').to.exist;
                    done();
                })
            })

            it('should be invalid if the value is greater than 24', function(done) {
                var b = new Board({boardNumber: 1, weImps: 25})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, 'wePercentage > 24 should be invalid').to.exist;
                    done();
                })
            })

            it('should be invalid if the board number is not an integer', function(done) {
                var b = new Board({boardNumber: 1, weImps: 16.6})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, '16.6 should not be a valid weImps').to.exist;
                    done();
                })
            })
        })
    })
    
    describe('virtuals', function() {
        const b = new Board({boardNumber: 1, contract: '3nw', we: 400})
        describe('they', function() {
            it('should be the inverse of \'we\'', function(done) {
                expect(b.they, 'this.they() == -this.we should be true').to.equal(-b.we)
                done()
            })
        })

        describe('level', function() {
            it("should be based on the contract string", function(done) {
                expect(b.level, 'this.level == 3 should be true').to.equal(3)
                done()
            })
        })

        describe('strain', function() {
            it('should be based on the contract string', function(done) {
                expect(b.strain, 'this.strain == \'n\' should be true').to.equal('n')
                done()
            })
        })

        describe('declarer', function() {
            it('should be based on the contract string', function(done) {
                expect(b.declarer, 'this.declarer == \'w\' should be true').to.equal('w')
                done()
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
            it('should be the inverse of wePercentage', function() {
                b.wePercentage = 50.5
                expect(b.theyPercentage, 'this.theyPercentage == 100 - this.wePercentage should be true').to.eq(100.0 - b.wePercentage)
            })
        })

        describe('theyImps', function() {
            it('should be the inverse of \'weImps\'', function(done) {
                b.weImps = 5
                expect(b.theyImps, 'this.theyImps == -this.weImps should be true').to.equal(-b.weImps)
                done()
            })
        })

    })
})