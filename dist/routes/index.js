"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index = express_1.Router();
index.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'API Working',
        routing: 'Security'
    });
});
exports.default = index;
