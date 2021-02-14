const express = require('express');
const server = express();
const cors = require('cors');

const modelRouter = require('./Routes/handler');


server.use(express.json());
server.use(cors());
server.use('/home',express.static('static'));
server.use('/users', modelRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT);
