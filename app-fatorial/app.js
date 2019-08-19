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
    const n = req.params.num
    client.set('fatorial', (err, reply) => {
        const result = fatorial(n) 
        res.send(`Hello Fatorial ${result}`)
    })

    function fatorial (n) {
        if (n == 0 || n == 1) {
            return 1
        } else {
            return n * fatorial(n-1)
        }
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))