import dotenv from "dotenv/config";
import path from "path";

import express  from "express";
const app = express();

import requestId from "express-request-id";
app.use(requestId());

import session from "express-session";

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict", 
        secure: false,
        expires: 43200000
    }
});

app.use(sessionMiddleware);

import {createServer} from "http";
const httpServer = createServer(app);

app.use("/api", express.json());

import auth from "./routes/authRouter.js"
app.use("/api", auth);

import sessionRouter from "./routes/sessionRouter.js";
app.use("/api", sessionRouter);

import requestRouter from "./routes/requestRouter.js"
app.use("/api", requestRouter);

import { Server } from "socket.io";
const io = new Server(httpServer);

app.use(express.static(process.env.STATIC_PATH));

import { requireValidUUID } from "./middelware/uuidValidator.js";
app.use("/:sessionID", requireValidUUID);   

app.use("/:sessionID", bodyParser.raw({type:"*/*"}));

import saveRequest from "./middelware/requestLogger.js"
app.use("/:sessionID", saveRequest);

const sendNotification = (req, res, next) => {
    const notification = {
        id: req.id,
        method: req.method
    }
    
    io.to(`${req.params.sessionID}`).emit("newRequest", {data: notification});

    next();
};

app.use("/:sessionID", sendNotification);

app.all("/:sessionID", (req, res) => {
    res.status(200).send();
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.env.STATIC_PATH + "/index.html"));
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

import db from "./database/connection.js";
import bodyParser from "body-parser";

io.on("connection", async (socket) => {
    const isInitialised = socket.request.session.sessionID ? true : false;

    if(isInitialised){
        socket.leave(`${socket.request.session.sessionID}`);

        const prevNotifications = await db.all("SELECT id, method FROM requests WHERE session_id = ?", [socket.request.session.sessionID]);
        
        if(prevNotifications.length !== 0){
            socket.emit("prevNotications", {data: prevNotifications})
        }
        
        socket.join(`${socket.request.session.sessionID}`);
    }
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , () => {
    console.log("server is running on port: ", PORT);
});
