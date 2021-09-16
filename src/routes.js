const express = require('express')
const UserController = require('./controllers/UserController')
const route = express.Router()

// GET
route.get('/', (req, res) => res.render("index"))
route.get('/dashboard', (req, res) => res.render("dashboard"))
route.get('/create-user', (req, res) => res.render("create-user"))
route.get('/room/:roomId', (req, res) => res.render("room"))
// route.get('/login-fail', UserController.fail)


// POST
route.post('/create-user', UserController.createUser)
route.post('/login', UserController.login)

module.exports = route