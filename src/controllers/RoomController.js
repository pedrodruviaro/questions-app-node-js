const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const roomName = req.body.roomName;
        const userId = req.params.userId;

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
                `INSERT INTO rooms (id, roomName, userId) VALUES ( ${parseInt(
                    roomId
                )}, "${roomName}", ${parseInt(userId)} )`
            );
        }

        await db.close();
        res.redirect(`/rooms/${roomId}`);
    },
};
