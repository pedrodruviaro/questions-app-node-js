const express = require('express')
const QuestionsController = require('./controllers/QuestionsController')
const RoomController = require('./controllers/RoomController')
const route = express.Router()

// GET
route.get('/', (req, res) => res.render("index"))
route.get('/create-pass', (req, res) => res.render("create-pass"))
route.get('/rooms/:roomId', RoomController.open)

// POST
route.post('/create-room', RoomController.create)
route.post('/rooms/enter-room', RoomController.enter)
route.post('/question/create/:roomId', QuestionsController.create)
route.post('/question/:roomId/:questionId/:action', QuestionsController.action)

module.exports = route