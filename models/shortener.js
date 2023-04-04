const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenSchema = new Schema({
  url: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('URL', shortenSchema)