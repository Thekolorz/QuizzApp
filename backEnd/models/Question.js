//models are just a representation of a database entity
//A Schema is like a blueprint of a database entity 

const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
  question: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  answer: String,
})

module.exports = mongoose.model('question', QuestionSchema)
// Basically, what we've done is describe how are the fields

