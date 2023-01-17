require('dotenv').config()
const express = require('express')
const dbClient = require('./db/client.js')
const simulationController = require('./controllers/simulation_controller.js');

let urlParser = express.urlencoded({ extended: true })
let app = express()
let port = 3001

app.set('view engine', 'pug')
app.set('views', './views')
app.use('/', urlParser)
app.get('/', (req,res) => {
    res.render('index')
})
app.use('/simulations', simulationController)

dbClient.initDB('./db/yago.db')
app.listen(port, () => console.log(`App is listening on port ${port}...`))

