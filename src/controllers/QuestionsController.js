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
    },

    async action(req, res){
        const db = await Database()

        // req params (/question/:roomId/:questionId/:action)
        const roomId = req.params.roomId
        const questionId = req.params.questionId
        const action = req.params.action
        const password = req.body.password
        
        // return obj
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(verifyRoom.pass === password){
            // actions
            if(action === "delete"){

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            } else if(action === "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }

        } else {
            res.render('fail', { roomId: roomId})
        }

        await db.close()

        res.redirect(`/rooms/${roomId}`)
    }
}