const Database = require("../db/config");

module.exports = {
    async createUser(req, res) {
        const db = await Database();

        //pegar os dados do formulario
        const username = req.body.username;
        const useravatar = req.body.avatar;
        const userpass = req.body.password;
        let userId = 0;

        let isUser = true;

        while (isUser) {
            for (let i = 0; i < 6; i++) {
                i === 0
                    ? (userId = Math.floor(Math.random() * 10).toString())
                    : (userId += Math.floor(Math.random() * 10).toString());
            }

            const userExists = await db.all(`SELECT id FROM users`);
            isUser = userExists.some((user) => user === userId);
        }

        //criar um usuario no banco de dados
        if (!isUser) {
            await db.run(
                `INSERT INTO users ( id, username, password, avatar ) VALUES ( ${parseInt(
                    userId
                )}, "${username}", "${userpass}", "${useravatar}" )`
            );
        }
        
        await db.close();

        //redirecionar para dashboard
        res.redirect('/dashboard')
    },

    async login(req, res){
        const db = await Database()

        const username = req.body.username
        const password = req.body.password

        const users = await db.all(`SELECT * FROM users`)

        const matchUser = users.find(user => user.username === username)
        console.log(matchUser);

        if(!matchUser){
            // res.render("index")
            return
        }
        
        if(matchUser.password === password){
            res.redirect("/dashboard")
        }

        if(matchUser.password !== password){
            // res.redirect('/login-fail')
            res.render("index", { error: "Wrong password" })
        }

        await db.close()
    },
};
