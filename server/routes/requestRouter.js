import db from "../database/connection.js";

import { Router } from "express";
const router = Router();

router.get("/requests/:id", async (req,res) => {
    const result = await db.get(
        "SELECT data FROM requests WHERE id = ? AND session_id = ?", [req.params.id, req.session.sessionID]);


    if(!result){
        return res.status(400).send({message: "nothing here"});
    }
    res.send({data: result});
});

export default router;