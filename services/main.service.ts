import * as nodemailer from "nodemailer";
import config from '../config/config';
import Token from "../classes/token";


class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }

    sendMail(id: any) {



        const tokenUser = Token.getJwtToken({
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
            host: config.host,
            port: config.port,
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },

            secure: true,
            service: 'gmail',
            auth: {
                user: config.user,
                pass: config.password
            }
        });

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }


}

export default new Mail;