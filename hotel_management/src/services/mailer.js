
const nodemailer = require("nodemailer");
// import { Request, Response, NextFunction } from "express";
const config = process.env;
// const Models = require("../../models");


let hostname = config.MAILER_HOST;
let username = config.MAILER_EMAIL;
let password = config.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
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

module.exports = transporter;
