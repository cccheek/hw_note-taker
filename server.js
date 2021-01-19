const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const { response } = require("express")
const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        else {
            const jparse = JSON.parse(data);
            res.send(jparse);
        }
    });
});

app.post("/api/notes", (req, res) => {

    const incoming = req.body;
    incoming.id = uuidv4()

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        else {

            let readFrom = JSON.parse(data)
            const newNote = [...readFrom, incoming]
            JSON.stringify(newNote)
            res.send(JSON.stringify(newNote))

            fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNote), (err, res) => {
                if (err) throw err;

            });
        }
    });

});

app.delete("/api/notes/:id", (req, res) => {
    const idParam = req.params.id;
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        else {
            // console.log("how far are we getting")
            const deleteData = JSON.parse(data)
            for (let i = 0; i < deleteData.length; i++) {
                if (deleteData[i].id === idParam) {
                    // console.log("are you making it?")
                    deleteData.splice(i, 1)

                    const finalPush = JSON.stringify(deleteData);
                    fs.writeFile(path.join(__dirname, "./db/db.json"), finalPush, (err, data) => {
                        if (err) throw err;
                        else {
                            res.send("Deleted!")
                        }
                    }

                    )
                }

            }
        }
    })
}



);


app.listen(PORT, function () {
    console.log(`run run run ${PORT}`);
})