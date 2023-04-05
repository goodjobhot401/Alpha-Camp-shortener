const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originLink: {
    type: String,
    require: true
  },
  shortenLink: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('URL', urlSchema)