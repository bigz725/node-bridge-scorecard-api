const User = require("../models/user");
const Session = require("../models/session").Session;
const ObjectId = require("mongoose").Types.ObjectId;

exports.userBoard =  (req, res) => {
  console.log(`user: ${req.targetUser.id}`)
  return res.status(200).json(req.targetUser)
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.newSession = async (req, res) => {
  try{
    user = req.targetUser
    let session = new Session(req.body);
    user.sessions.push(session);
    await user.save();
    return res.status(200).send({ message: "Created", id: session.id });
  }
  catch(err) {
    console.log(`error: ${err}`)
    return res.status(500).send({error: "Server error"})
  }
};

exports.patchSession = async (req, res) => {  
  try {
    await User.updateOne({_id: ObjectId(req.params.id),
                      "sessions._id": ObjectId(req.params.sessionId)},
                      {"$set": {"sessions.$": req.body}}, {upsert: false})
    res.status(200).send()      
    }
   catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
};

// remember, currentUser comes from the token.  The id parameter comes from the URL
// and is the target object of the PATCH operation
exports.patchUser = async (req, res) => {
  console.log(`patching user ${req.params.id}`);
  try{
    await User.updateOne({_id: ObjectId(req.params.id)}, req.body)
    res.status(200).send()
  }
  catch(error) {
    console.log(error)
    res.status(500).send({error: "Server error"})
  }
};
