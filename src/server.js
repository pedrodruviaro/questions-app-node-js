const express = require('express')
const route = require('./routes')
const path = require('path')

const server = express()
const PORT = process.env.PORT || 3000

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.static('public'))

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(route)



server.listen(PORT, () => console.log(`Server running on port ${PORT}`))