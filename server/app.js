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
        allowedHeaders: ["my-custom-header"], //TODO Check this
        credentials: true
    }
});

import auth from "./routes/authRouter.js"
app.use(auth);


import sessionRouter from "./routes/sessionRouter.js";
app.use("/api", sessionRouter);

import requestRouter from "./routes/requestRouter.js"
app.use("/api", requestRouter);


import saveRequest from "./middelware/requestLogger.js"
app.use("/:sessionId", saveRequest);

app.get("/:sessionId", (req,res) => {
    const notification = {
        id: req.id,
        method: req.method
    }

    io.to(`${req.params.sessionId}`).emit("newRequest", {data: notification});

    res.status(200).send();
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    socket.join(`${socket.request.session.sessionID}`)
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT , () => {
    console.log("server is running on port: ", PORT);
});