"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const index_1 = __importDefault(require("./routes/index"));
const mailsend_1 = __importDefault(require("./routes/mailsend"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File upload
server.app.use(express_fileupload_1.default());
//Configurar CORS
server.app.use(cors_1.default({
    origin: true, credentials: true
}));
//Rutas de mi app
server.app.use('/', index_1.default);
server.app.use('/user', usuario_1.default);
server.app.use('/mail', mailsend_1.default);
mongoose_1.default.connect('mongodb+srv://admin:@aruna1997TR@cluster0.8vqoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw err;
    console.log('db is connected');
    console.log(mongoose_1.default.STATES.connected);
});
//Levantar express 
server.start(() => {
    console.log(`Server on port ${server.port}`);
});
