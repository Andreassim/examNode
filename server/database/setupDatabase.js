import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    db.exec(`DROP TABLE requests;`);
    db.exec(`DROP TABLE sessions;`);
    db.exec(`DROP TABLE users;`);
};

await db.exec(`
CREATE TABLE IF NOT EXISTS users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

db.exec(`
CREATE TABLE IF NOT EXISTS sessions 
    (
        id TEXT PRIMARY KEY,
        is_private BOOLEAN NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);


db.exec(`
CREATE TABLE IF NOT EXISTS requests 
    (
        id TEXT PRIMARY KEY,
        data TEXT,
        session_id TEXT,
        FOREIGN KEY (session_id) REFERENCES sessions(id)
    )
`);
