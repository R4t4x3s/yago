const express = require('express')
const router = express.Router()
const Lead = require('../models/lead')
const Simulation = require('../models/simulation')

const simulationService = require('../services/simulation_service/')

router.get('/new', function(req, res, _next) {
    res.render('simulations/new')
})

router.get('/:id', function(req,res,_next){
    let simulation = Simulation.find(req.params.id)
    res.render('simulations/show', { simulation })
})

router.post('/', async (req, res, next) => {
    let lead = Lead.build(req.body)
    lead = Lead.create_with_interest(lead)
    let simulation = await simulationService.generateSimulation(lead.interest)
    simulation = Simulation.create(simulation);
    res.redirect(303, `/simulations/${simulation.id}`)
})

module.exports = router
