  
import Server from './classes/server';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import fileUpload from 'express-fileupload';

import cors from 'cors';

import userRoutes from './routes/usuario';

import index from './routes/index';
import MailRoute from './routes/mailsend';



const server  = new Server();

// Body parser
server.app.use(bodyparser.urlencoded({extended: true}));
server.app.use(bodyparser.json());

// File upload

server.app.use(fileUpload());

//Configurar CORS

server.app.use(cors({
    origin: true, credentials: true
}));


//Rutas de mi app

server.app.use('/', index); 
server.app.use('/user', userRoutes);
server.app.use('/mail', MailRoute);

mongoose.connect('mongodb+srv://admin:@aruna1997TR@cluster0.8vqoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 

{
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false}
, (err) => {
    if(err) throw err;

    console.log('db is connected');
    console.log(mongoose.STATES.connected); 
});

//Levantar express 

server.start(() => {
    console.log(`Server on port ${server.port}` );
});