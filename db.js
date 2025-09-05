import Database from "better-sqlite3";

const db = new Database("data.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    stickyNotes INT DEFAULT 50, 
    pats INT DEFAULT 0,
    XP INT DEFAULT 0,
    level INT DEFAULT 1,
    reminders TEXT DEFAULT ''
);`).run()

db.prepare(`
    CREATE TABLE IF NOT EXISTS global (
    pats INT DEFAULT 0,
    users INT DEFAULT 0
);`).run()

db.prepare(`
    CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    dueTime TEXT,
    text TEXT,
    status TEXT DEFAULT 'pending'
);`).run()

db.prepare(`INSERT OR IGNORE INTO global (pats, users) VALUES (0, 0);`).run()


export default db;