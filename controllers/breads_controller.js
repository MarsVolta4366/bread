const express = require("express")
const breads = express.Router()
const Bread = require("../models/bread")
const Baker = require("../models/baker")

// Index:
breads.get('/', async (req, res) => {
    // .limit(10) means only the first 10 breads will be returned
    // .lean() converts to a plain js object which means no access to custom helper methods or virtuals
    // .lean() saves memory
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(10).lean()

    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
    })
})

breads.get("/new", async (req, res) => {
    try {
        const foundBakers = await Baker.find()
        res.render("New", {
            bakers: foundBakers
        })
    } catch (err) {
        res.send("ERROR")
    }
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    Baker.find()
      .then(foundBakers => {
          Bread.findById(req.params.id)
            .then(foundBread => {
              res.render('Edit', {
                  bread: foundBread, 
                  bakers: foundBakers 
              })
            })
      })
})

breads.get("/:arrayIndex", (req, res) => {
    Bread.findById(req.params.arrayIndex)
        .populate("baker")
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
    console.log("req.body: " + req.body)
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