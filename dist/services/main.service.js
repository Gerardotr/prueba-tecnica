"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const token_1 = __importDefault(require("../classes/token"));
class Mail {
    constructor(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    sendMail(id) {
        const tokenUser = token_1.default.getJwtToken({
            email: this.to,
            id: id
        });
        let mailOptions = {
            from: "binqode.now.sh",
            to: this.to,
            subject: this.subject,
            html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                    <style>
                        h1 { 
                            color: #AA4B6B;
                        }
                    </style>
                </head>
                <body>
                    <h1>B1nQ0de</h1>
                    <h2>Hola.</h2>
                    <br>
                    <p>No hay de qué preocuparse. Puedes restablecer tu contraseña de B1nQ0de haciendo click en el enlace de abajo:</p>
                    <a href="https://binqode.now.sh/resetPassword/${tokenUser}">https://binqode.now.sh/resetPassword/${tokenUser}</a>
                    <br>
                    <p>Si no solicitaste restablecer tu contraseña, elimina este mensaje.</p>
                   
                </body>
                </html>
            
            `,
            template: 'email',
        };
        const transporter = nodemailer.createTransport({
            host: config_1.default.host,
            port: config_1.default.port,
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
            secure: true,
            service: 'gmail',
            auth: {
                user: config_1.default.user,
                pass: config_1.default.password
            }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            }
            else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}
exports.default = new Mail;
