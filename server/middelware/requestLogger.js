import db from "../database/connection.js"

export async function saveRequest(req, res, next) {
    const requestToStore = {
        details:{
            id: req.id,
            url: req.url,
            method: req.method,
            timestamp : Date.now(), 
            remoteAddress : req.socket.remoteAddress,
            remoteFamily : req.socket.remoteFamily,
        },
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body,
    }

    await db.run("INSERT INTO requests (id, data, session_id) VALUES (?, ? ,?);",[requestToStore.details.id, JSON.stringify(requestToStore), req.params.sessionId]);

    next();
};

export default saveRequest;