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