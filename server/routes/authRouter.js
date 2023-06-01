import { Router } from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/logout", (req, res) =>{
    if(!req.session.user){
        return res.status(400).send({message: "not logged in"})
    }
    req.session.destroy();
    res.status(200).send({message: "user logged out"});
});

router.get("/verify", (req, res) => {
    res.status(200).send({data: req.session.user});
});

router.post("/login", async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "missing email or password"});
    }
    
    const user = await db.get("SELECT id, email, password FROM users WHERE email = ?", [req.body.email]);
    if(!user){
        return res.status(400).send({message: "email or password is incorrect"});
    }
    
    const match = await bcrypt.compare(req.body.password, user.password);
    
    if(!match){
        return res.status(400).send({message: "email or password is incorrect"});
    }
    delete user["password"];
    req.session.user = user;
   
    res.status(200).send({data: user});
});

router.post("/signup", async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "missing email or password"});
    }

    const password = await bcrypt.hash(req.body.password, 12);

    try{
        await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password]);
    } catch (error){
        return res.status(400).send({message: "user already exists"});
    }
    
    res.status(200).send({message: "user created"});
});

export default router;