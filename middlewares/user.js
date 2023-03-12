const User = require("../models/user");


exports.lookupTargetUser = async (req, res, next) => {
    const targetUserId = req.params.id || req.body.id || req.query.id;
    try{        
        const targetUser = await User.findById(targetUserId).orFail();
        req.targetUser = targetUser;
        next();
    }
    catch(err) {
        console.log(`middleware lookupTargetUser error: ${err}`);
        return res.status(404).send({message: `User id ${targetUserId} not found`});
    }
}