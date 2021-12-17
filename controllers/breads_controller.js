const express = require("express")
const breads = express.Router()
const Bread = require("../models/bread")

breads.get("/", (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render("Index", {
                breads: foundBreads,
                title: "Index Page"
            })
        })

})

breads.get("/new", (req, res) => {
    res.render("New")
})

// EDIT
breads.get("/:arrayIndex/edit", (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            res.render("Edit", {
                bread: foundBread
            })
        })
})

breads.get("/:arrayIndex", (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .then(foundBread => {
            res.render("Show", {
                bread: foundBread
            })
        })
        .catch(error => {
            res.send("404")
        })
})

breads.post("/", (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    
    if(req.body.hasGluten === "on") {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect("/breads")
})

// UPDATE
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    console.log("REQ BODY: " + req.body.name)
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
})

// DELETE
breads.delete("/:arrayIndex", (req, res) => {
    Bread.findByIdAndDelete(req.params.arrayIndex)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect("/breads")
        })
})

module.exports = breads