const User = require('../models/user')
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = async (req, res) => {
    console.log('in userboard controller')
    const user = await User.findById(req.body['id'])
    console.log(`user: ${user}`)
    res.status(200).json(user)
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  