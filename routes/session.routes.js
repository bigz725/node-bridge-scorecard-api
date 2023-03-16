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
    app.get("/api/test/sessions", [verifyToken, lookupCurrentUser], controller.getSessions)
    app.get("/api/test/sessions/:id", [verifyToken, lookupCurrentUser, lookupTargetSession], controller.getSession)
    app.post("/api/test/sessions", [verifyToken, lookupCurrentUser], controller.createSession)
    app.patch("/api/test/sessions/:id", [verifyToken, lookupCurrentUser, lookupTargetSession], controller.patchSession)
    app.delete("/api/test/sessions/:id", [verifyToken, lookupCurrentUser], controller.deleteSession)
}