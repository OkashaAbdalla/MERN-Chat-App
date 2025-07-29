import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const Server = http.c reateServer(app);

const io = new Server(server, {
    cors: {
        origin:
    }
})
