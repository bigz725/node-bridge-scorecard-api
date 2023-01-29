const chai = require('chai');
const expect = chai.expect

const Board = require('../../../models/board')

describe('board', function() {
    describe('validations', function() {
        describe('for boardNumber', function() {
            it('should be invalid if board number is null', function() {
                var b = new Board({})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber is required').to.exist
                })
            })

            it('should be invalid if the board number is less than 1', function() {
                var b = new Board({boardNumber: 0})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber < 0 should be invalid').to.exist;
                })
            })

            it('should be invalid if the board number is greater than 36', function() {
                var b = new Board({boardNumber: 37})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, 'boardNumber > 36 should be invalid').to.exist;
                })
            })

            it('should be invalid if the board number is not an integer', function() {
                var b = new Board({boardNumber: 5.3})
                b.validate(function(err) {
                    expect(err?.errors?.boardNumber, '5.3 should not be a valid boardNumber').to.exist;
                })
            })
        })
        describe('for contract', function() { //♣♦♥♠

            it('allows correct board expressions', function() {
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
            })
        })
        describe('for we', function() {
            const boardNumber = 1
            it('should be invalid for numbers less than -7600', function() {
                var b = new Board({boardNumber: boardNumber, we: -7601})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' can't be less than 7600").to.exist                    
                })
            })
            it('should be invalid for numbers greater than 7600', function() {
                var b = new Board({boardNumber: boardNumber, we: 7601})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' can't be greater than 7600").to.exist                    
                })
            })
            it('must be an integer', function() {
                var b = new Board({boardNumber: boardNumber, we: 420.20})
                b.validate(function(err) {
                    expect(err?.errors?.we, "'we' must be an integer").to.exist                    
                })
            })
        })
        describe('for wePercentage', function() {
            it('should be invalid if the value is less than 0', function() {
                var b = new Board({boardNumber: 1, wePercentage: -1.5})
                b.validate(function(err) {
                    expect(err?.errors?.wePercentage, 'wePercentage < 0 should be invalid').to.exist;
                })
            })

            it('should be invalid if the value is greater than 100', function() {
                var b = new Board({boardNumber: 1, wePercentage: 101.01})
                b.validate(function(err) {
                    expect(err?.errors?.wePercentage, 'wePercentage > 100 should be invalid').to.exist;
                })
            })
        })
        describe('for weImps', function() {
            it('should be invalid if the value is less than 0', function() {
                var b = new Board({boardNumber: 1, weImps: -1})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, 'wePercentage < 0 should be invalid').to.exist;
                })
            })

            it('should be invalid if the value is greater than 24', function() {
                var b = new Board({boardNumber: 1, weImps: 25})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, 'wePercentage > 24 should be invalid').to.exist;
                })
            })

            it('should be invalid if the board number is not an integer', function() {
                var b = new Board({boardNumber: 1, weImps: 16.6})
                b.validate(function(err) {
                    expect(err?.errors?.weImps, '16.6 should not be a valid weImps').to.exist;
                })
            })
        })
    })
})