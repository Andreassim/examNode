import db from "../database/connection.js";

import { Router } from "express";
const router = Router();

router.get("/session/new", async (req,res) => {
    req.session.sessionID = req.id

    if(req.query.private){
        req.session.private = true;
        //do private stuff
    }

    await db.run("INSERT INTO sessions (id, is_private) VALUES (?, ?)", [req.id, false]);

    res.send({data: req.id});
});


router.post("/session/reconnect", async (req,res) => {
    if(!req.body.sessionID){
        return res.status(400).send({message: "Missing sessionId"})
    }

    const session = await db.get("SELECT id, is_private FROM sessions WHERE id = ?", [req.body.sessionID]);
    
    console.log(session);

    if(session.is_private){
        req.session.private = true;
        // check user in session has access
    }

    req.session.sessionID = session.id;

    res.send({data: session.id});
});

export default router;