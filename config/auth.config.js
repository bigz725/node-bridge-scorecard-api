require('dotenv').config()
const util = require('util')
const crypto = require('crypto')

//const randomBytesAsync = util.promisify(crypto.randomBytes);
const saltByteLength = parseInt(process.env.SALT_BYTE_LENGTH) || 48

exports.salt = () => {
    let retval = crypto.randomBytes(saltByteLength).toString('base64url');
    return retval
}

exports.secret = process.env.SECRET || "lskdjflskdjflkwjsfiwjef"
exports.saltByteLength = saltByteLength
