const dbClient = require('../db/client')

function build(params){
    return to_js_obj(params)
}

function create(interest){
    let db = dbClient.db();
    let { type, sector, annualRevenue, enterpriseNumber, legalName,naturalPerson} = to_db_record(interest)
    let { lastInsertRowid } = db.prepare(`
        INSERT INTO interests 
               (type, sector, annualRevenue, enterpriseNumber, legalName,naturalPerson) 
               VALUES (?,?,?,?,?,?)
    `).run(type, sector, annualRevenue, enterpriseNumber, legalName,naturalPerson)
    return find(lastInsertRowid) 
}
function find(id){
    let db = dbClient.db();
    const interest = db.prepare(`
        SELECT *
            FROM interests
            WHERE id = ?
    `).get(id)
    return  to_js_obj(interest)

}
// HACK number 1 -> because sqlite doesn't have boolean type :(
function to_js_obj(data) {
    function parseBool(v){
        return v === "true"
    }
    if(data.hasOwnProperty("annualRevenue"))
        data.annualRevenue =  parseInt(data.annualRevenue)
    if(data.hasOwnProperty("naturalPerson"))
        data.naturalPerson =  parseBool(data.naturalPerson)
    return data
}
// HACK number 2 -> because sqlite doesn't have boolean type :(
function to_db_record(interest) {
    interest.naturalPerson = interest.naturalPerson ? "true" : "false"
    return interest
}

module.exports = {
    build,
    create,
    find
}