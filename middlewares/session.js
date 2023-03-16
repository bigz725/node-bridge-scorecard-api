const Session = require("../models/session").Session;

exports.lookupTargetSession = async (req, res, next) => {
    const sessionId = req.params.id || req.body.id || req.query.id
    const currentUserId = req.currentUser._id
    try{
        req.targetSession = await Session.find({_id: sessionId, owner: currentUserId}).orFail();
        next();
    }
    catch(err) {
        console.log(`lookupTargetSession: Session ${sessionId} not found or is not owned by user ${currentUserId}`);
        res.status(404).send({message: 'Session not found'});
    }
}
