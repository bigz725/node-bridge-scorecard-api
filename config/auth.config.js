require('dotenv').config()
const crypto = require('crypto')
const fs = require('fs')
const logger = require('../logger').textLogger
const saltByteLength = parseInt(process.env.SALT_BYTE_LENGTH) || 48

exports.salt = () => {
    let retval = crypto.randomBytes(saltByteLength).toString('base64url');
    return retval
}

jwtSecretFromFile = (fileName=(process.env.SECRET_FILE || "config/secret.key")) => {
    try {
        const data = fs.readFileSync(fileName, 'utf8')
        logger.info(`Using JWT secret from file ${fileName}`)
        return data
    }
    catch (err) {
        logger.warn(`Unable to read JWT secret from file ${fileName}`)
        logger.warn(err)
    }
}

requireConcreteSecret = () => {
    //do not require a secret for any dev, test, or local environment
    //if the environment is not set, assume production
    regex = /(dev*|test*|local*)/i
    return !regex.test(process.env.NODE_ENV || "production")
}

let secret = process.env.SECRET || jwtSecretFromFile()
 
if (secret == null) {
    if (requireConcreteSecret() ) {
        logger.error("Attempting to run a deployment without a JWT secret")
        logger.error("If you get this message in a development environment,")
        logger.error("set the environment variable NODE_ENV to one of 'dev', 'test', or 'local'")
        throw new Error("Attempting to run a deployment without a JWT secret")
    }
    else {
        logger.warn("No JWT secret found, using a dummy secret")
        logger.warn("This is only appropriate for development environments")
    }
}

exports.secret = secret || "for development only"
exports.saltByteLength = saltByteLength

