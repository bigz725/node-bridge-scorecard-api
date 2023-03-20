const { isNullOrUndefined } = require("mongoose/lib/utils");
const { session } = require("../models");

const Session = require("../models/session").Session;
const Board = require("../models/board").Board
const ObjectId = require("mongoose").Types.ObjectId;

const defaultPageSize = process.env.DEFAULT_PAGINATION_SIZE || 10

exports.getSessions = async(req, res) => {
  console.log(`user: ${req.currentUser._id}`);
  const page = req.query.page || 0 ;
  const pageSize = req.query.pageSize || defaultPageSize ;
  sessions = await Session.find(
    {owner: req.currentUser.id},
    'name location date', 
    {skip: page * pageSize, sort: { "date": -1 }}
  );
  return res.status(200).json(sessions);
};

exports.createSession = async(req, res) => {
    console.log(`creating session for user: ${req.currentUser._id}`);
    try{
        let input = {...{owner: req.currentUser._id}, ...req.body };
        const sess = await Session.create( input );
        req.currentUser.sessions.push(sess._id);
        await req.currentUser.save();
        return res.status(200).send({message: "Created", id: sess.id});
    }
    catch(err) {
        console.log(`error in createSession: ${err}`);
        return res.status(500).send({message: "Server error"});
    }

};

exports.getSession = (req, res) => {
    res.status(200).json(req.targetSession)
}

exports.patchSession = async (req, res) => {
    try{
        await Session.findOneAndUpdate({_id: req.params.id, owner: req.currentUser._id},
        req.body).orFail();
        return res.status(200).send({message: 'Session updated'})
    } catch(err) {
        console.log(`Error in patchSession: ${err}`);
        return res.status(500).send({message: 'Server error'})
    }

}

exports.deleteSession = async(req, res) => {
    try{
        await Session.deleteOne({ _id: req.params.id, owner: req.currentUser._id});
        return res.status(200).send({message: "DELETED!"}); //come back Ali! come back Ali's sister!
    }
    catch(err) {
        console.log(`Error in deleteSession: ${err}`);
        return res.status(500).send({message: "Flagrant error", title: "Everything is fine, nothing is ruined", headline: "This is real" });
    }
}

exports.addBoard = async(req, res) => {
    try{
        let newBoard = new Board(req.body);
        req.targetSession.boards.push(newBoard);
        req.targetSession.save();
        return res.status(200).send({message: "Created", id: newBoard._id});
    }
    catch(err) {
        console.log(`Error in addBoard: ${err}`);
        return res.status(500).send({message: "Server error"});
    }
}

exports.patchBoard = async(req, res) => {
    let targetSession = req.targetSession
    try{
        let targetBoard = await targetSession.boards.id(req.params.boardId);
        if (targetBoard === null) {
            return res.status(404).send({message: "Board not found"})
        }
        targetSession.markModified('boards')
        for(const [key, value] of Object.entries(req.body)) {
            targetBoard[key] = value
        }
        await targetSession.save()

        return res.status(200).send({message: "modified"})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({message: "server error"})
    }
}