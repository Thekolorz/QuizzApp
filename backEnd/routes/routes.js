const express = require('express')
const router = express.Router()
const Question = require('../models/Question') // includes our model

// get all quiz questions

router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// get one quiz question
router.get('/questions/:id', async (req, res) => {
  try {
      const _id = req.params.id 

      const question = await Question.findOne({_id})        
      if(!question){
          return res.status(404).json({})
      }else{
          return res.status(200).json(question)
      }
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

// create one quiz question
router.post('/questions', async (req, res) => {
  // We're using the post method in this route because we want to create something new into the database.
  /* This route will serve to insert a new question into the database, with its description and alternatives.  data  will be sent as JSON in the request body. That being said we'll wrap our request with a try/catch statement and retrieve the request data. We'll also return a 500 status code (which means 'Internal Server Error') in case of a error. */
  try {
    const { description } = req.body
    const { alternatives } = req.body

    const question = await Question.create({
        description,
        alternatives
    })

    return res.status(201).json(question)
} catch (error) {
    return res.status(500).json({"error":error})
}
})

// update one quiz question
router.put('/questions/:id', (req, res) => {

})

// delete one quiz question
router.delete('/questions/:id', (req, res) => {

})


router.get('/', (req, res) => {
  res.send('helloWorld')
})



module.exports = router