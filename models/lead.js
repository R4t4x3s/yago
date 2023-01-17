const dbClient = require('../db/client')
const Interest =  require('./interest')

function create_with_interest(lead) {
    let db = dbClient.db();
    let { id: interestId } = Interest.create(lead.interest)
    let { name, lastName, email, address, phoneNumber } = lead
    let { lastInsertRowid } = db.prepare(`
        INSERT INTO leads 
               (name,lastName,email,address,phoneNumber,interestId) 
               VALUES (?,?,?,?,?,?)`)
         .run(name, lastName, email, address, phoneNumber, interestId)
    return find_with_interest(lastInsertRowid) 
}

function find_with_interest(id) {
    let db = dbClient.db();
    const lead = db.prepare(`
        SELECT *
            FROM leads 
            WHERE id = ?
    `).get(id)
    lead.interest = Interest.find(lead.interestId)
    delete lead.interestId
    return lead
}

function build(param){
    return {
        name: param.name ,
        lastName: param.lastName,
        email: param.email,
        address: param.address,
        phoneNumber: param.phoneNumber,
        interest: Interest.build(param.interest)
    }
}

module.exports = {
    build,
    create_with_interest
}
