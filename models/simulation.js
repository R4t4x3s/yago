const dbClient = require('../db/client.js')

function create(simulation) {
    let {quote, advice} = simulation
    let db = dbClient.db();
    let { lastInsertRowid } = db.prepare(`INSERT INTO simulations 
                (quote, advice)
                VALUES (?,?)`)
      .run(JSON.stringify(quote), JSON.stringify(advice))
    return find(lastInsertRowid) 
}

function find(id) {
    let db = dbClient.db();
    const db_simulation = db.prepare(` SELECT * FROM simulations WHERE id = ? `).get(id)
    return  load(db_simulation)
}

function load(db_simulation){
    db_simulation.quote = JSON.parse(db_simulation.quote),
    db_simulation.advice = JSON.parse(db_simulation.advice)
    return db_simulation
}

module.exports = {
    create,
    find,
}
