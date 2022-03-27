import bodyParser from "./middlewares/bodyParser";
import router from "./routes";
import {Express} from "express";
import { Authorized } from "./middlewares/authorized";
import { CORS } from "./middlewares/cors";
import {Server, Socket} from "socket.io";
import { Chat } from './controllers/chat';
const express = require('express');
const App:Express = express();

App.use((req, res, next) => {
    res.on("finish", () => {
        const log = res.statusCode < 300 ? console.log : console.warn;
        log(`${req.method} ${req.url} ${req.ip}:
        Date: ${new Date().toISOString()}
        Content-Length: ${req.headers["content-length"]}
        User-Agent: ${req.headers["user-agent"]}
        X-Forwarded-For: ${req.headers["x-forwarded-for"]}
        Host: ${req.headers["host"]}
        Referer: ${req.headers["referer"]}
        ${res.statusCode} ${res.statusMessage}`);
    })
    next();
});
App.use(CORS);
App.use(bodyParser);
App.use(Authorized);
App.use(router);

const server = require('http').createServer(App);

// Initialize sockets

new Chat(server);

server.listen(8011,() => {
    console.log("Running at 8011");
}).on("error", (err:Error) => {
    console.log(err.message);
    return err;
})

export default App;