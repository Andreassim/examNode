import db from "../database/connection.js";

import { Router } from "express";
const router = Router();

router.get("/session/new", async (req,res) => {
    req.session.sessionID = req.id

    if(req.query.private){
        //do private stuff
    }

    await db.run("INSERT INTO sessions (id, is_private) VALUES (?, ?)", [req.id, false]);

    res.send({data: req.id});
});

export default router;