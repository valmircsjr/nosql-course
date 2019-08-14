const express = require('express')
const app = express()
const port = 3000
const redis = require("redis")
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Erro ao conectar!" );
});

client.on("connect", function (error) {
    console.log("Conectado com sucesso!");
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/fatorial/:num', (req, res) => {
    const param = req.params.num
    client.set('fatorial', (err, reply) => {
        res.send(`Hello Fatorial ${reply}`)
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))