const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const breadsController = require("./controllers/breads_controller")
require("dotenv").config()
const PORT = process.env.PORT

const app = express()

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("views", __dirname + "/views")
app.set("view engine", "jsx")
app.engine("jsx", require("express-react-views").createEngine())
app.use(methodOverride("_method"))

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to db"))

app.get("/", (req, res) => {
    res.send("Welcome to the bread app")
})

app.use("/breads", breadsController)

// Baker
const bakersController = require("./controllers/bakers_controller")
app.use("/bakers", bakersController)

app.get("*", (req, res) => {
    res.send("404")
})

app.listen(PORT, () => {
    console.log(`\n***Listening on port:${PORT}***\n`)
})