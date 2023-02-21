const { authJwt } = require("../middlewares")
const controller = require("../controllers/user")

module.exports = function(app) {
    app.use(function(_, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })
    app.get("/api/test/user", [authJwt.verifyToken, authJwt.lookupCurrentUser], controller.userBoard)
    app.get("/api/test/user/:id", [authJwt.verifyToken, authJwt.lookupCurrentUser], controller.userBoard)
    app.patch("/api/test/user/:id", [authJwt.verifyToken, authJwt.lookupCurrentUser, authJwt.lookupCurrentUsersRoles, authJwt.isSelfOrAdmin], controller.patchUser)

    app.post("/api/test/user/:id/sessions", [authJwt.verifyToken, authJwt.lookupCurrentUser, authJwt.lookupCurrentUsersRoles, authJwt.isSelfOrAdmin], controller.newSession)


    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.lookupCurrentUser, authJwt.lookupCurrentUsersRoles, authJwt.hasRole("admin")], controller.adminBoard)
}
