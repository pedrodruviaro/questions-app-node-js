const Database = require('../db/config')

module.exports = {
    async open(req, res){
        const userId = req.params.userId
        const db = await Database()

        const user = await db.get(`SELECT * FROM users WHERE id = ${userId}`)
        const userRooms = await db.all(`SELECT * FROM rooms WHERE userId = ${userId}`)

        await db.close()
        res.render('dashboard', { user: user, userRooms: userRooms})
    }
}