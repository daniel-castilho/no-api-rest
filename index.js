const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const e = require('express');

const JWTSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken) {
        const bearer = authToken.split(' ');
        jwt.verify(bearer[1], JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token inválido!" });
            } else  {
                req.token = bearer[1];
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        })
    } else {
        res.status(401);
        res.json({ err: "Token inválido!" });
    }
    next();
}


let db = {
    games: [
        {
            id: 1,
            title: "Call of Duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 2,
            title: "Sea of Thieves",
            year: 2018,
            price: 60
        },
        {
            id: 3,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ],
    users: [
        {
            id: 1,
            nome: "Daniel",
            email: "dan.castilho@gmail.com",
            password: "123456"
        },
        {
            id: 1,
            nome: "Castilho",
            email: "atr1@bol.com",
            password: "123456"
        }
    ]
}

app.get("/games", auth, (req, res) => {
    res.statusCode = 200;
    res.json({ user: req.loggedUser, games: db.games });
});

app.get("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus = 400;
        res.send('Isso não é um número');
    } else {
        const id = parseInt(req.params.id);
        const game = db.games.find((g) => g.id == id);
        if (game) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post('/game', auth, (req, res) => {
    const { title, price, year } = req.body;
    db.games.push({
        id: 4,
        title,
        price,
        year
    });
    res.sendStatus(200);
});

app.delete('/game/:id', auth, (req, res) => {
    console.log('aqui');
    if (isNaN(req.params.id)) {
        console.log('isNaN');
        res.sendStatus = 400;
        res.send('Isso não é um número');
    } else {
        console.log('else');
        const id = parseInt(req.params.id);
        console.log(id);
        const index = db.games.findIndex(g => g.id == id);
        console.log(index);
        if (index == -1) {
            res.sendStatus(404);
        } else {
            db.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put('/game/:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus = 400;
        res.send('Isso não é um número');
    } else {
        const id = parseInt(req.params.id);
        const game = db.games.find((g) => g.id == id);
        if (game) {
            const { title, price, year } = req.body;
            if (title) {
                game.title = title;
            }
            if(price) {
                game.price = price;
            }
            if(year) {
                game.year = year;
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post("/auth", (req, res) => {
    const { email, password } = req.body;

    if (email) {
        db.users.find(user => {
            user.email == email;

            if (user) {

                if (user.password == password) {
                    jwt.sign({ id: user.id, email: user.email }, JWTSecret, {expiresIn: '1h'}, (err, token) => {
                        if (err) {
                            res.status(400);
                            res.json({ err: "Falha interna" });
                        } else {
                            res.status(200);
                            res.json({ token: token });
                        }
                    });
                } else {
                    res.status(401);
                    res.json({ err: "Credenciais inválidas!" });
                }
            } else {
                res.status(404);
                res.json({ err: "Email enviado não existe" });
            }
        });
    } else {
        res.status(400);
        res.json({ err: "Email inválido" });
    }
});

app.listen(3000, () => {
    console.log('API rodando!');
});