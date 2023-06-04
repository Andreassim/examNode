import path from "path";

const RFC4122GRegEx = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;

export const requireValidUUID = (req, res, next) => {
    if(RFC4122GRegEx.test(req.params.sessionID)){
        next();
    }else{
        res.sendFile(path.resolve(process.env.STATIC_PATH + "/index.html"));
    }  
}
