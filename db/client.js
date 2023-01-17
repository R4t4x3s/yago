const file_system = require('fs')
const sqlite = require("better-sqlite3")

let db 

function initTables(db){
    db.prepare(`
    CREATE TABLE interests (
        id INTEGER PRIMARY KEY,
        type TEXT,
        sector TEXT,
        annualRevenue INTEGER,
        enterpriseNumber varchar(10),
        legalName TEXT,
        naturalPerson TEXT
    )
    `).run()
    db.prepare(`
    CREATE TABLE leads(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        interestId INTEGER,
        CONSTRAINT leads_fk_interestId FOREIGN KEY (interestId)
            REFERENCES interests (id) ON DELETE CASCADE
    )
    `).run()
    db.prepare(`
        CREATE TABLE simulations
        (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            quote text,
            advice text
        )
    `).run()
}

module.exports = {
    initDB: (path) =>{
        if(file_system.existsSync(path)){
            console.log("Db already exists nothing to do!")
            db = new sqlite(path)
        }else{
            console.log("Db doesn't exist creating db and schema...")
            db = new sqlite(path)
            initTables(db);
        }
    },
    db: () => {
        return db
    }
}
