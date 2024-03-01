const express = require("express")

const server = express()

server.get("/", (req, res) => {
    return res.send("Ola Mundo")
})

server.listen(3000, () => {
    console.log("servidor em funcionamento")
})