module.exports = function(app) {
    require('./root.routes')(app)
    require('./auth.routes')(app)
    require('./user.routes')(app)
    require('./session.routes')(app)
    require('./version.routes')(app)
}