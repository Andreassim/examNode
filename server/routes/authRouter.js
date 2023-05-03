import { Router } from "express";
const router = Router();

router.get("/logout", (req, res) =>{
    req.session.destroy()
    res.status(200).send()

});

router.post("/login", (req, res) => {

});

export default router;