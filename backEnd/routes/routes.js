const express = require('express')
const router = express.Router()
const Question = require('../models/Question') // includes our model

// get all quiz questions

router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find({});;
        console.log('question',questions);
        
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



router.get('/', (req, res) => {
  res.send('helloWorld')
})



module.exports = router