const User = require("../models/user");

exports.userBoard = (req, res) => {
  const id = req.body["id"] || req.params["id"];
  User.findById(id)
    .then((user) => {
      if (user === null) {
        res.status(404).send(`User ${id} not found`);
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

exports.newSession = async(req, res) => {
  user = await User.findById(req.params.id)
  if (user === null) {
    res.status(404).send(`User ${req.params.id} not found`)
    return;
  }
  const session = new Session(req.body)
  user.sessions.concat(session)
  await user.save()
}

exports.patchUser = (req, res) => {
  console.log(`patching user ${req.params.id}`);
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send(`User ${req.params.id} not found`);
        return;
      }
      user
        .updateOne(req.body)
        .then(() => {
          res.status(200).send("Modified");
          return;
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(`Server error`);
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server error" });
      return;
    });
};
