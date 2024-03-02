const express = require("express")

const server = express()
server.use(express.json())

// --- Banco de Dados ---
const data = ["Javascript", "Reactjs", "React Native"]

// --- Middleware ---
server.use((req, res, next) => {
    console.log("Funciona")

    return next()
})

function verifyCurso(req, res, next) {
    //const nameCurso = req.body.curso
    //console.log(nameCurso)

    if (!req.body.curso) {
        return res.status(400).json({ err: "Nome invalido" })
    }

    return next()
}

// --- Rotas ---
// 1- Query Params => ?name=Nodejs
// 2- Route Params => /curso/1
// 3- Body Params => {name: nodejs, id: 1}

server.get("/", (req, res) => {
    return res.send("Ola Mundo")
})

server.post("/curso", verifyCurso, (req, res) => {
    const { curso } = req.body

    data.push(curso)

    return res.json(data)
})

server.get("/curso", (req, res) => {
    return res.json(data)
})

server.get("/curso/:index", (req, res) => {
    const { index } = req.params

    const result = data[index]

    return res.json(result)
})

server.put("/curso/:index", verifyCurso, (req, res) => {
    const { index } = req.params
    const { curso } = req.body

    data[index] = curso

    return res.json(data)
})

server.delete("/curso/:index", (req, res) => {
    const { index } = req.params

    data.splice(index, 1)

    return res.json(data)
})

// --- Criação de Servidor ---

server.listen(3000, () => {
    console.log("servidor em funcionamento")
})