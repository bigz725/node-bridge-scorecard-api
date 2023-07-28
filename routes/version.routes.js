const controller = require("../controllers/version")

module.exports = function(app) {
    app.get("/api/version", controller.version);
}