import express from 'express';
export default class Server {
    public app: express.Application;
    public port = process.env.PORT ||  3000; 

    constructor( ){
        this.app = express();
    }
    start( callback: () => void ) {
        this.app.listen(this.port, callback);
    }
}