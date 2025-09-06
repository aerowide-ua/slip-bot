import db from '../db.js'

export function GET(table, op, user='') {
    if (op==0) {
        let row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(user)
        if (!row) {
            db.prepare(`INSERT OR IGNORE INTO ${table} (id) VALUES (?)`).run(user)
            row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(user)
        } return row
    }
    else if (op==1) {
        let row = db.prepare(`SELECT * from ${table}`).get() 
        return row
}}

export function INC (t, col, id='', val=1) {
    let query = `UPDATE ${t} SET ${col} = ${col} + ${val}`;
    if (id !== '') { query += ` WHERE id='${id}'`;}
    db.prepare(query).run();
}

export function SET (t, col, id='', val=1) {
    let query = `UPDATE ${t} SET ${col} = ${val}`;
    if (id !== '') { query += ` WHERE id='${id}'`;}
    db.prepare(query).run();
}