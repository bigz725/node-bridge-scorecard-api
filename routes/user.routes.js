const { authJwt, _, user } = require("../middlewares")
const controller = require("../controllers/user")

const fullSelfOrAdminStack = [
    authJwt.verifyToken, 
    authJwt.lookupCurrentUser, 
    authJwt.lookupCurrentUsersRoles, 
    authJwt.isSelfOrAdmin
]
module.exports = function(app) {
    app.use(function(_, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })
    app.get("/api/user", [fullSelfOrAdminStack, user.lookupTargetUser].flat(), controller.userBoard)
    app.get("/api/user/:id", [fullSelfOrAdminStack, user.lookupTargetUser].flat(), controller.userBoard)
    app.patch("/api/user/:id", [fullSelfOrAdminStack, user.lookupTargetUser].flat(), controller.patchUser)

    app.post("/api/user/:id/sessions", [fullSelfOrAdminStack, user.lookupTargetUser].flat(), controller.newSession)
    app.patch("/api/user/:id/sessions/:sessionId", fullSelfOrAdminStack, controller.patchSession)

    app.get("/api/admin", [authJwt.verifyToken, authJwt.lookupCurrentUser, authJwt.lookupCurrentUsersRoles, authJwt.hasRole("admin")], controller.adminBoard)
}
