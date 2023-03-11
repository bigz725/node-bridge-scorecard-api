const User = require("../models/user");
const Session = require("../models/session").Session;
const ObjectId = require("mongoose").Types.ObjectId;

exports.userBoard = (req, res) => {
  const id = req.body["id"] || req.params["id"];
  User.findById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ error: `User ${id} not found` });
        return;
      }
      console.log(`user: ${user}`);
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return res.status(500).send({ error: "Server error" });
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.newSession = async (req, res) => {
  const user = await User.findById(req.params.id).orFail(() =>{
    return res.status(404).send({message: "User not found", userId: req.params.id})
  });
  let session = new Session(req.body);
  user.sessions.push(session);
  await user.save();
  return res.status(200).send({ message: "Created", id: session.id });


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

exports.patchUser = (req, res) => {
  console.log(`patching user ${req.params.id}`);
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ error: `User ${req.params.id} not found` });
        return;
      }
      user
        .updateOne(req.body)
        .then(() => {
          res.status(200).send({ message: "Modified" });
          return;
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Server error" });
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server error" });
      return;
    });
};
