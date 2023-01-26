const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contractRegex = /^(?<level>[1-7])(?<strain>[cdhs♣♦♥♠]|nt|n)(?<dblRdbl>x{0,2})\s*(?<declarer>[nsew])/i 

const BoardSchema = new Schema({
    boardNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 36,
        validate: {
            validator: Number.isInteger
        }
    },
    contract: {
        type: String,
        validate: contractRegex
    },
    we: {
        type: Number,
        max: 7600,
        min: -7600,
        validate: {
            validator: Number.isInteger,      
        }
    },    
    wePercentage: {
        type: Number,
        max: 100.0,
        min: 0.0
    },
    weImps: {
        type: Number,
        max: 24,
        min: 0,
        validate: {
            validator: Number.isInteger
        }
    }
})
BoardSchema.virtual('they').get(
    function() { return -this.we; }
)
BoardSchema.virtual('theyImps').get(
    function() { return -this.weImps }
)
BoardSchema.virtual('theyPercentage').get(
    function() { return 100.0 - this.wePercentage }
)
BoardSchema.virtual('level').get(
    function() { return parseInt(this.contract?.match(contractRegex)?.groups?.level) }
)
BoardSchema.virtual('strain').get(
    function() { return this.contract?.match(contractRegex)?.groups?.strain }
)
BoardSchema.virtual('declarer').get(
    function() { return this.contract?.match(contractRegex)?.groups?.declarer }
)
BoardSchema.virtual('doubled').get(
    function() { return this.contract?.match(contractRegex)?.groups?.dblRdbl == 'x' }
)
BoardSchema.virtual('redoubled').get(
    function() { return this.contract?.match(contractRegex)?.groups?.dblRdbl == 'xx' }
)
const Board = mongoose.model('Board', BoardSchema)
module.exports = Board