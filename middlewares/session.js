const Session = require("../models/session").Session;
const logger = require('../logger').textLogger

exports.lookupTargetSession = async (req, res, next) => {
    const sessionId = req.params.id || req.body.id || req.query.id
    const currentUserId = req.currentUser._id
    try{
        logger.info(`Looking up session id ${sessionId} for user ${currentUserId}`)
        result = await Session.find({_id: sessionId, owner: currentUserId}).orFail();
        req.targetSession = result[0];
        next();
    }
    catch(err) {
        logger.error(`lookupTargetSession: Session ${sessionId} not found or is not owned by user ${currentUserId}`);
        res.status(404).send({message: 'Session not found'});
    }
}
