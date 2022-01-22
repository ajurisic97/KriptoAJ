const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  nazivKripto: {
    type: String},
  skraceniNaziv: {
    type: String,
    max: [3,'Maksimalno 3 znaka, Vaš broj: {VALUE}']},
  datumKupnje: {
    type: Date,
  },
  cijenaKupnje: {
      type: Number
  },
  kolicina: {
      type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

portfolioSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Portfolio', portfolioSchema);
