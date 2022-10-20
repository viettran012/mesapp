const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const connection = require('./configs/connectDB');
const socket = require('./socket');

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const io = new Server(server, {
    cors: {
        origin: ['http://192.168.0.105:5500'],
        methods: ['GET', 'POST'],
    },
});

const route = require('./routes');

connection.connect();
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

socket(io, server);

//route init
route(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(4010, () => {
    console.log('listening on *:4010');
});
