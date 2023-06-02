import dotenv from "dotenv/config";
import path from "path";

import express  from "express";
const app = express();
app.use(express.json());

import requestId from "express-request-id";
app.use(requestId());

import session from "express-session";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        expires: 43200000
    }
});

app.use(sessionMiddleware);

import {createServer} from "http";
const httpServer = createServer(app);

import auth from "./routes/authRouter.js"
app.use(auth);

import sessionRouter from "./routes/sessionRouter.js";
app.use("/api", sessionRouter);

import requestRouter from "./routes/requestRouter.js"
app.use("/api", requestRouter);

import { Server } from "socket.io";
import { requireValidUUID } from "./middelware/uuidValidator.js";
let io = new Server(httpServer);

app.use(express.static(process.env.STATIC_PATH));

app.use("/:sessionId", requireValidUUID);   

app.use("/:sessionId", express.text());
app.use("/:sessionId", express.urlencoded({extended:true}));


import saveRequest from "./middelware/requestLogger.js"
app.use("/:sessionId", saveRequest);

const sendNotification = (req, res, next) => {
    const notification = {
        id: req.id,
        method: req.method
    }
    
    io.to(`${req.params.sessionId}`).emit("newRequest", {data: notification});

    next();
};

app.use("/:sessionId", sendNotification);

app.get("/:sessionId", (req,res) => {
    res.status(200).send();
});

app.post("/:sessionId", (req,res) => {
    res.status(200).send();
});

app.put("/:sessionId", (req,res) => {
    res.status(200).send();
});

app.patch("/:sessionId", (req,res) => {
    res.status(200).send();
});

app.delete("/:sessionId", (req,res) => {
    res.status(200).send();
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.env.STATIC_PATH + "/index.html"));
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

import db from "./database/connection.js";

io.on("connection", async (socket) => {
    if(socket.request.session.sessionID){

        socket.leave(`${socket.request.session.sessionID}`);
        
        const prevNotifications = await db.all("SELECT id, method FROM requests WHERE session_id = ?", [socket.request.session.sessionID]);
        if(prevNotifications.length !== 0){
            let data = [];
            prevNotifications.forEach((notification) => {
                data.push(notification);
            });
            socket.emit("prevNotications", {data: data})
        }
        
        socket.join(`${socket.request.session.sessionID}`);
    }
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , () => {
    console.log("server is running on port: ", PORT);
});