const Database = require('../db/config')

module.exports = {
    async create(req, res){
        const db = await Database()
        const roomId = req.params.roomId
        const question = req.body.question

        
        // adding question
        await db.run(`INSERT INTO questions (title, read, room) VALUES ("${question}", 0, ${parseInt(roomId)})`)

        await db.close()
        res.redirect(`/rooms/${roomId}`)
    }
}