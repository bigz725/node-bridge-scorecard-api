const { authJwt, _, user } = require("../middlewares")
const controller = require("../controllers/session")
const { verifyToken, lookupCurrentUser } = require("../middlewares/authJwt")
const { lookupTargetSession } = require("../middlewares/session")
const fullSelfOrAdminStack = [
    authJwt.verifyToken, 
    authJwt.lookupCurrentUser, 
    authJwt.lookupCurrentUsersRoles, 
    authJwt.isSelfOrAdmin
]

module.exports = function(app) {
    app.get("/api/sessions", [verifyToken, lookupCurrentUser], controller.getSessions)
    app.get("/api/sessions/:id", [verifyToken, lookupCurrentUser], controller.getSession)
    app.post("/api/sessions", [verifyToken, lookupCurrentUser], controller.createSession)
    app.patch("/api/sessions/:id", [verifyToken, lookupCurrentUser, lookupTargetSession], controller.patchSession)
    app.delete("/api/sessions/:id", [verifyToken, lookupCurrentUser], controller.deleteSession)
    app.post("/api/sessions/:id/boards", [verifyToken, lookupCurrentUser, lookupTargetSession], controller.addBoard)
    app.patch("/api/sessions/:id/boards/:boardId", [verifyToken, lookupCurrentUser, lookupTargetSession], controller.patchBoard)
}