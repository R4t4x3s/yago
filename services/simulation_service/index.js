const rcProSimulation = require('./rc_pro_simulation.js')
const quoteService = require('../../services/quote_service.js')
const adviceEngine = require('../../lib/advice_engine.js')
const nacebelEngine = require('../../lib/nacebel_engine.js')

async function generateSimulation(interest){
    switch(interest.type){
        case "rc_pro":
            return await rcProSimulation.run(interest, quoteService, adviceEngine, nacebelEngine)
        default:
            return await rcProSimulation.run(interest, quoteService, adviceEngine, nacebelEngine)
    }
}
module.exports = {
    generateSimulation
}
