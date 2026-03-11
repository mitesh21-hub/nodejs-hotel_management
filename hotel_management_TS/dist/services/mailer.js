"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var nodemailer = require("nodemailer");
var config = process.env;
var hostname = config.MAILER_HOST;
var username = config.MAILER_EMAIL;
var password = config.MAILER_PASSWORD;
var transporter = nodemailer.createTransport({
    host: hostname,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: username,
        pass: password,
    },
    logger: true,
});
exports.default = transporter;
//# sourceMappingURL=mailer.js.map