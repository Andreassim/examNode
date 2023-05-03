import dotenv from "dotenv/config";

import express  from "express";
import {createServer} from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

import session from "express-session";
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import auth from "./routes/authRouter.js"
app.use(auth);

io.on("connection", (socket) => {
    socket.emit("hello", "world");
});

const PORT = process.env.PORT || 8080;
httpServer.listen(() => {
    console.log("server is running on port: ", PORT);
});