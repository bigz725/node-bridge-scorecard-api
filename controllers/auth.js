const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const logger = require('../logger').textLogger

exports.signup = async (req, res) => {
  logger.debug('in signup')
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  try {
    if (req.body.roles != null) {
      var roles = await Role.find({name: {$in: req.body.roles}}).orFail();
      user.roles = roles.map(role => role._id);
    }
    else {
      userRole = await Role.findOne({name: "user"}).orFail()
      user.roles = [userRole._id]
    }
    await user.save()
    res.status(200).send({message: `User ${user.username} created`, id: user._id})
  }
  catch(err) {
    logger.error(`Error signing up user ${req.body.username}`)
    logger.error(`${err}`)
    res.status(500).send({message: "Server error"})
  }
}

exports.signin = async (req, res) => {
  var user
  try {
    user = await User.findOne({username: req.body.username})
      .populate("roles", "-__v")
    if(!user) {
      logger.warn(`Login attempt for non-existant user ${req.body.username}`)
      return res.status(404).send({ message: "Unable to login" });
    }
  }
  catch(err) {
    logger.error(`Signin error: ${err}`)
    res.status(500).send({ message: "Server error" });
    return;
  }

  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    logger.warn(`Incorrect password for user ${user.username}`)
    return res.status(404).send({
      message: "Unable to login"
    });
  }

  if (user.salt == null) {
    user.salt = config.salt();
    logger.debug("Saving user salt");
    await user.save();
  }

  var token = jwt.sign({ id: user.id, salt: user.salt }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  logger.info(`User: ${user.username} successfully logged in.`);
  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    roles: user.roles.map(x => `ROLE_${x.name.toUpperCase()}`),
    accessToken: token
  });
  return;
};

exports.signout = async (req, res) => {
  req.currentUser.salt = null;
  await req.currentUser.save();
  logger.info(`User ${req.currentUser.username} has signed out`);
  res.status(200).send({message: "Logged out."});
  return;
}
 