const express = require("express")
const baker = express.Router()
const Baker = require("../models/baker")
const bakerSeedData = require("../models/bakerSeed")

// Index: 
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})                                      

baker.get("/data/seed", async (req, res) => {
    try {
        await Baker.insertMany(bakerSeedData)
        res.redirect("/breads")
    } catch (err) {
        res.send("ERR: " + err)
    }
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

module.exports = baker