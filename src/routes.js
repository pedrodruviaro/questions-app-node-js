const express = require('express')
const DashboardController = require('./controllers/DashboardController')
const RoomController = require('./controllers/RoomController')
const UserController = require('./controllers/UserController')
const route = express.Router()

// GET
route.get('/', (req, res) => res.render("index"))
route.get('/dashboard/:userId', DashboardController.open)
route.get('/create-user', (req, res) => res.render("create-user"))
route.get('/room/:roomId', (req, res) => res.render("room"))
route.get('/login-fail', UserController.fail)


// POST
route.post('/create-user', UserController.createUser)
route.post('/login', UserController.login)
route.post('/create-room/:userId', RoomController.create)

module.exports = route