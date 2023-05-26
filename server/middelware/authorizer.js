export function requireUser(req, res , next){
    console.log(req.session);
    if(!req.session.user){
        return res.status(401).send({message: "Unathorized"});
    }
    next();
};