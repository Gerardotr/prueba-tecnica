"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_service_1 = __importDefault(require("../services/main.service"));
const usuario_model_1 = require("../models/usuario.model");
const MailRoute = express_1.Router();
MailRoute.post('/', (req, res) => {
    const message = Object.assign({}, req.body);
    const email = message.to;
    usuario_model_1.Usuario.findOne({ email }).then((estudinates) => __awaiter(void 0, void 0, void 0, function* () {
        yield estudinates;
        if (estudinates == null) {
            res.json({
                ok: false,
                message: 'No hay estudiante registrado con ese email'
            });
        }
        else {
            var estudiante = { id: estudinates._id, nombre: estudinates.nombre, email: estudinates.email };
            if (estudinates.password == '') {
                res.json({
                    ok: false,
                    message: 'Inicia sesión con Google'
                });
            }
            else {
                main_service_1.default.to = message.to;
                main_service_1.default.subject = message.subject;
                main_service_1.default.message = message.message;
                let result = main_service_1.default.sendMail(estudiante.id);
                res.status(200).json({ ok: true, emailStatus: 'Send' });
            }
        }
    }));
});
exports.default = MailRoute;
