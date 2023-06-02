import db from "../database/connection.js"

export async function saveRequest(req, res, next) {
    let body;
    if(!req.body == {}){
        const utf8decoder = new TextDecoder(); 
        body = utf8decoder.decode(req.body);
    }
    
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
        body: body,
    }

    await db.run("INSERT INTO requests (id, data, session_id, method) VALUES (?, ? ,?, ?);",[requestToStore.details.id, JSON.stringify(requestToStore), req.params.sessionId, req.method]);

    next();
};

export default saveRequest;