export function requireUser(req, res , next){
    if(!req.session.user){
        return res.status(401).send({message: "Unathorized"});
    }
    next();
};
