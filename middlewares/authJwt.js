const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const logger = require('../logger').textLogger

verifyToken = (req, res, next) => {
  let token =
    req.headers["x-access-token"] ||
    req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.warn(`No token provided on a route that requires auth: ${req.url}`)
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      logger.warn(`Error verifying token to access route: ${req.url}`)
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
    logger.warn(`User id ${req.currentUserId} lookup failed: ${error}`);
    return res.status(404).send({ message: "Lookup failed." });
  }
};

lookupCurrentUsersRoles = async (req, res, next) =>{
  const currentUser = req.currentUser;
  try{
    req.currentUserRoles = await Role.find({ _id: { $in: currentUser.roles } });
    next();
  }
  catch(error) {
    logger.warn(`lookupCurrentUserRoles failed: ${error}`);
    return res.status(403).send({error: "User requires authorization but doesn't have it"})
  }
}

hasRole = (role) => {
  return (req, res, next) => {
    if (req.currentUserRoles?.find((element) => element.name === role)) {
      next();
    }
    else {
      logger.warn(`hasRole: User ${req.currentUserId} needs role ${role} but doesn't have it.`)
      return res.status(403).send({error: 'Unauthorized'})
    }
  }
}

isSelfOrAdmin = (req, res, next) => {
  const targetUserId = req.params.id || req.body.id || req.query.id;
  if(targetUserId == req.currentUserId || req.currentUserRoles?.find((element) => element.name === "admin") ) 
  {
    return next();
  }
  return res.status(403).send({ error: "Can't access other users"})
}

const authJwt = {
  verifyToken,
  lookupCurrentUser,
  lookupCurrentUsersRoles,
  isSelfOrAdmin,
  hasRole,
};

module.exports = authJwt;
