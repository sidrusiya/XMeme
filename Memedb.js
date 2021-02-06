var mongoose = require('mongoose');

var MemeSchema = new mongoose.Schema({
     id: {
      type: String,
      unique: true,
      required: true,
    },
    uAt: {
      type: Date,
      required: true,
    },
     Memer: String,
     caption: String,
     url: String
})

module.exports = mongoose.model('Memes', MemeSchema)