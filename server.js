const { response } = require("express")
const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

PORT = 3000

app.use(express.static)

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"))
})
// server.get("/mypage", (req, res) => {
    // res.send("yo")
// })




app.listen(PORT, function(){
    console.log(`run run run ${PORT}`);
})