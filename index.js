const express = require("express")
const breadsController = require("./controllers/breads_controller")
require("dotenv").config()
const PORT = process.env.PORT

const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the bread app")
})

app.use("/breads", breadsController)

app.listen(PORT, () => {
    console.log(`\n***Listening on port:${PORT}***\n`)
})