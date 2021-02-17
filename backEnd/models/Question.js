//models are just a representation of a database entity
//A Schema is like a blueprint of a database entity 

const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
  description: String,
  alternatives: [
      {
          text: {
              type: String,
              required: true
          },
          isCorrect: {
              type: Boolean,
              required: true,
              default: false
          }
      }
  ]
})

module.exports = mongoose.model('Question', QuestionSchema)
// Basically, what we've done is describe how are the fields

