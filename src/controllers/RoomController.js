const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const roomName = req.body.roomName;
        const pass = req.body.password;

        let roomId = 0;
        let isRoom = true;

        while (isRoom) {
            for (let i = 0; i < 6; i++) {
                i === 0
                    ? (roomId = Math.floor(Math.random() * 10).toString())
                    : (roomId += Math.floor(Math.random() * 10).toString());
            }

            const roomExists = await db.all(`SELECT id FROM rooms`);
            isRoom = roomExists.some((room) => room === roomId);
        }

        if (!isRoom) {
            await db.run(
                `INSERT INTO rooms (id, pass, roomName) VALUES ( ${parseInt(
                    roomId
                )}, "${pass}", "${roomName}")`
            );
        }

        await db.close();

        res.redirect(`/rooms/${roomId}`);
    },

    async open(req, res) {
        const db = await Database();
        const roomId = req.params.roomId;

        const questions = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} AND read = 0`
        );

        const readedQuestions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        await db.close();

        res.render("room", { questions: questions, readedQuestions: readedQuestions, roomId: roomId });
    },

    async enter(req, res){
        const roomId = req.body.roomCode

        const db = await Database()

        const rooms = await db.all(`SELECT * FROM rooms`)
        const roomExists = rooms.some(room => Number(room.id) === Number(roomId))

        if(roomExists){
            res.redirect(`/rooms/${roomId}`)
        } else {
            res.redirect('/')
        }

        await db.close()

    }
};
