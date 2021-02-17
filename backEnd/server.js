const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/routes') // includes the routes.js file
const cors = require('cors') // includes cors module

require('dotenv').config()
/* var https_port = config.server.port || 3030; */
const port = process.env.PORT || 3030;


const quizRoutes = require('./routes/routes')

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use('/routes', quizRoutes) // tells the server to use the routes in routes.js

mongoose.connect('mongodb+srv://user:user@cluster0.1jadn.mongodb.net/quizz?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

