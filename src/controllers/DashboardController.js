const Database = require('../db/config')

module.exports = {
    async open(req, res){
        const userId = req.params.userId
        const db = await Database()

        const user = await db.get(`SELECT * FROM users WHERE id = ${userId}`)

        await db.close()
        res.render('dashboard', { user: user})
    }
}