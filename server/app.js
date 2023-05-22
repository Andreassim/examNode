import dotenv from "dotenv/config";

import express  from "express";
const app = express();
app.use(express.json());

import requestId from "express-request-id";
app.use(requestId());

import session from "express-session";

const sessionMiddleware = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));


import {createServer} from "http";
const httpServer = createServer(app);

import { Server } from "socket.io";
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5177",
        methods: ["*"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

import auth from "./routes/authRouter.js"
app.use(auth);

app.get("/test", (req,res) => {
    req.session.socketID = req.id
    console.log(req.session);
    res.send({data: req.id});
});

app.get("/:socketId", (req,res) => {
    console.log(req.params.socketId);
    const data = req;
    console.log(req);

    // store request

    // send notification for new request
    
    io.to(`${req.params.socketId}`).emit("newRequest", data);

    res.send();
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    console.log(socket.request.session);

    socket.join(`${socket.request.session.socketID}`)
    
    socket.emit("hello", "world");
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , () => {
    console.log("server is running on port: ", PORT);
});