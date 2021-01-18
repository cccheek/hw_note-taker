const { response } = require("express")
const express = require("express")
const fs = require("fs")

const server = express()

PORT = 3000

server.get("/", (req, res) => {
    res.send("yo")
})




server.listen(PORT, function(){
    console.log(`run run run ${PORT}`);
})