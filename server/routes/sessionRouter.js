import db from "../database/connection.js";

import { Router } from "express";
import { requireUser } from "../middelware/authorizer.js";
const router = Router();

router.get("/sessions", requireUser , async (req, res) => {
    const sessions = await db.all("SELECT id, is_private FROM sessions WHERE user_id = ? ", [req.session.user.id]);
 
    res.status(200).send({data: sessions}); 
});

router.get("/sessions/new", async (req,res) => {
    req.session.sessionID = req.id

    const privateSession = req.query.privateSession == "true" ? true : false;
    
    req.session.private = false
    let userID;
    if(req.session.user){
        userID = req.session.user.id
        if(privateSession){
            req.session.private = true;
        }
    }

    await db.run("INSERT INTO sessions (id, is_private, user_id) VALUES (?, ?, ?)", [req.id, privateSession, userID]);

    return res.status(200).send({
        data: {
            id:req.id,
            private: req.session.private
        }
    });
});

router.post("/sessions/reconnect", async (req,res) => {
    if(!req.body.sessionID){
        return res.status(400).send({message: "Missing sessionId"})
    }

    const session = await db.get("SELECT id, is_private, user_id FROM sessions WHERE id = ?", [req.body.sessionID]);
    
    if(!session){
        return res.status(400).send({message: "No session with that id"});
    }

    if(session.is_private){
        if(!req.session.user){
            req.session.private = false;
            return res.status(401).send({message: "unathorized"});
        }
        if(!session.user_id == req.session.user.id){
            req.session.private = false;
            return res.status(401).send({message: "unathorized"});
        }
        req.session.private = true;
        req.session.sessionID = session.id;
        return res.status(200).send({
            data: {
                id:session.id,
                private: req.session.private
            }
        });
    }

    req.session.sessionID = session.id;
    req.session.private = false;

    return res.status(200).send({
        data: {
            id:session.id,
            private: req.session.private
        }
    });
});


router.delete("/sessions/:id", async (req, res) => {
    const sessionId = req.params.id;

    const session = await db.get("SELECT id, user_id FROM sessions WHERE id = ?", [sessionId]);
    if(!session){
        return res.status(400).send({message: "Session doesnt exists"})
    }

    if(session.user_id != null){
        if(!req.session.user){
            return res.status(401).send({message: "Unathorized"});
        }
        if(!req.session.user.id == session.user_id){
            return res.status(401).send({message: "Unathorized"});   
        }
    }

    try{

        await db.run("DELETE FROM requests WHERE session_id = ?", [session.id]);
        await db.run("DELETE FROM sessions WHERE id = ?", [session.id]);

    }catch {
        return res.status(500).send({message: "Something went wrong"});
    }
    res.status(200).send({message: `${session.id} has been deleted`});
});


export default router;