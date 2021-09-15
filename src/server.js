const express = require('express')
const route = require('./routes')

const server = express()
const PORT = process.env.PORT || 3000

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(route)


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))