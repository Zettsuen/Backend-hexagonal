import bodyParser from "./middlewares/bodyParser";
import router from "./routes";
import {Express} from "express";
import { Authorized } from "./middlewares/authorized";
import { CORS } from "./middlewares/cors";
import { Chat } from './controllers/chat';
import { CheckMember } from "./middlewares/checkMember";
import { CheckStaff } from "./middlewares/checkStaff";
import { Sockets } from "./infrastructure/socketsInit";
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

// Initialize CORS

App.use(CORS);

// Use the bodyParser custom

App.use(bodyParser);

// Check if the user that requested can access

App.use('/v1/authorized/*', Authorized);

// Check if the user that requeted is member of the resource

App.use('/v1/authorized/memberNeeded/*', CheckMember);

// Check if the user that requested is staff

App.use('/v1/authorized/memberNeeded/onlyStaff/*', CheckStaff);

// Initialize router

App.use(router);

const server = require('http').createServer(App);

// Initialize sockets

const initSockets = new Sockets(server);

new Chat(initSockets.getSocket());

server.listen(8011,() => {
    console.log("Running at 8011");
}).on("error", (err:Error) => {
    console.log(err.message);
    return err;
})

export default App;