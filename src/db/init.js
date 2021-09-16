const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()

        // create user table
        await db.exec(`CREATE TABLE users ( id INTEGER PRIMARY KEY, username TEXT, password TEXT, avatar TEXT )`)

        //create rooms table
        await db.exec(`CREATE TABLE rooms ( id INTEGER PRIMARY KEY, roomName TEXT, userId INT )`)

        // create questions table
        await db.exec(`CREATE TABLE questions ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, read INT, room INT )`)

        await db.close()
    }
}

initDb.init()