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
        .populate({
            path: "breads",
            options: {limit: 5}
        })
        .then(foundBaker => {
            console.log(foundBaker)
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// DELETE
// baker.delete("/:id", (req, res) => {
//     Baker.findByIdAndDelete(req.params.id)
//         .then(deletedBaker => {
//             console.log("Deleted baker: " + deletedBaker)
//             res.status(303).redirect("/breads")
//         })
// })

// ASYNC DELETE
baker.delete("/:id", async (req, res) => {
    try {
        await Baker.findByIdAndDelete(req.params.id)
        res.status(303).redirect("/breads")
    } catch(err) {
        console.log(err)
        res.send("ERROR")
    }
})

module.exports = baker