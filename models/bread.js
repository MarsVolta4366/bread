const mongoose = require("mongoose")
const breads = require("../controllers/breads_controller")

const {Schema} = mongoose

const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: Boolean,
  image: {type: String, default: "http://placekitten.com/200/200"},
  baker: {
    type: String,
    enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
  }
})

breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}

const Bread = mongoose.model("Bread", breadSchema)
module.exports = Bread

