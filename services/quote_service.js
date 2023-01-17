const Axios = require('axios')
const axios = Axios.create({
    baseURL: 'https://staging-gtw.seraphin.be/quotes/',
    headers: { 'X-Api-Key': process.env.YAGO_KEY }
});
axios.defaults.headers.post['Content-Type'] = 'application/json'


module.exports = {
    post: async (path,payload) => {
        let resp = (await axios.post(path,payload)).data
        return {
            coverageCeiling: resp.data.coverageCeiling,
            deductible: resp.data.deductible,
            covers: {
                afterDelivery: resp.data.grossPremiums.afterDelivery,
                publicLiability: resp.data.grossPremiums.publicLiability,
                professionalIndemnity: resp.data.grossPremiums.professionalIndemnity,
                entrustedObjects: resp.data.grossPremiums.entrustedObjects,
                legalExpenses: resp.data.grossPremiums.legalExpenses
            }
        }
    }
}
// function get(path, payload) {
//     console.log(`fetching '/quotes/${path}...`)
//     console.dir(payload)
//     let resp = {
//         "success": true,
//         "message": "success",
//         "data": {
//             "available": true,
//             "coverageCeiling": 300000,
//             "deductible": 5000,
//             "quoteId": "seniorTechChallenge618857637",
//             "grossPremiums": {
//                 "afterDelivery": 43.6,
//                 "publicLiability": 163.5,
//                 "professionalIndemnity": 196.2,
//                 "entrustedObjects": 54.5,
//                 "legalExpenses": 65.4
//             }
//         }
//     }
//     // TODO transform reponse into this 
//     return {
//         coverageCeiling: 300000,
//         deductible: 5000,
//         covers: {
//             "afterDelivery": 43.6,
//             "publicLiability": 163.5,
//             "professionalIndemnity": 196.2,
//             "entrustedObjects": 54.5,
//             "legalExpenses": 65.4
//         }
//     }
// }
