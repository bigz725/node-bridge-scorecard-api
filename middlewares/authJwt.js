const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token =
    req.headers["x-access-token"] ||
    req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.currentUserId = decoded.id;
    next();
  });
};

lookupCurrentUser = async (req, res, next) => {
  try {
    let userFromToken = await User.findById(req.currentUserId).orFail();
    req.currentUser = userFromToken;
    next();
  } catch (error) {
    console.log(`User lookup failed: ${error}`);
    return res.status(404).send({ message: "Lookup failed." });
  }
};

lookupCurrentUsersRoles = async (req, res, next) =>{
  currentUser = req.currentUser;
  try{
    req.currentUserRoles = await Role.find({ _id: { $in: currentUser.roles } });
    next();
  }
  catch(error) {
    console.log(`lookupCurrentUserRoles failed: ${error}`);
    return res.status(403).send({message: "User requires authorization but doesn't have it"})
  }
}

hasRole = (role) => {
  return (req, res, next) => {
    if (req.currentUserRoles?.find((element) => element.name === role)) {
      next();
    }
    else {
      console.log(`hasRole: User ${req.currentUserId} needs role ${role} but doesn't have it.`)
      return res.status(403).send({message: 'Unauthorized'})
    }
  }
}

const authJwt = {
  verifyToken,
  lookupCurrentUser,
  lookupCurrentUsersRoles,
  hasRole,
};

module.exports = authJwt;
