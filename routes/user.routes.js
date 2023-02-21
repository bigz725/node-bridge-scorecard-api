const { authJwt } = require("../middlewares")
const controller = require("../controllers/user")

module.exports = function(app) {
    app.use(function(_, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.get("/api/test/all", controller.allAccess)
    app.get("/api/test/user", [authJwt.verifyToken, authJwt.lookupCurrentUser], controller.userBoard)


    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.lookupCurrentUser, authJwt.lookupCurrentUsersRoles, authJwt.hasRole("admin")], controller.adminBoard)
}
