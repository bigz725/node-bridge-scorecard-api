const { verifySignUp } = require("../middlewares")
const controller = require("../controllers/auth")

module.exports = function(app) {
    app.use(function(_, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    )

    app.post("/api/auth/signin", controller.signin)

    app.post("/api/auth/signout", [verifyToken, lookupCurrentUser], controller.signout)
}