import "reflect-metadata";
import * as nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
const config = process.env;
import { Users } from "../entity/Users";
import { userSchema } from "../schema/hotelSchema"
import { nextTick } from "process";

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

export default transporter;
