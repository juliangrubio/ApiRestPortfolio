const express = require('express');
const cors = require('cors');
const sendMail = require('../helpers/sendMail');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use( cors() ); 
        this.app.use( express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.post('/email', sendMail);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

}

module.exports = Server;