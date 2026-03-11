import "reflect-metadata";
import { Request, Response } from "express";
const apiResponse = require("../services/apiResponse.js");
import { getManager, CreateDateColumn } from 'typeorm';
import transporter from '../services/mailer';
import { Contact } from '../entity/Contact';
import upload from '../middleware/fileUpload';


export const contactUs = async (req: Request, res: Response) => {
    try {
        const { name, phone, subject, message } = req.body;
        const entityManager = getManager();
        console.log("data>>>>", req.body);
        const data = await entityManager.insert(Contact, {
            name,
            phone,
            subject,
            message,
        })

        res.send(data);

        const mailOptions = {
            from: "mitesh.saresa@mindinventory.com",
            to: "mitesh.saresa@mindinventory.com",
            subject: "Success Message",
            text: "successful",
            html: "<b>Hello There!</b>",
            headers: { 'x-myheader': 'test header' },
            attachments: [{
                filename: 'hotel_booking.png',
                path: "src/images/hotel_booking.png",
            }]
        }

        const info = transporter.sendMail(mailOptions)
        console.log("Message sent: %s", (await info).messageId);

        // const getAllMails = await entityManager.createQueryBuilder(Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").orderBy("created_date", "DESC").take(2).skip(0).getMany()
        // console.log("getAllMails>>>>>>", getAllMails);

        // res.send(getAllMails)
    } catch (error) {
        return apiResponse.errorResponseData(res, error);
    }
}

export const getMails = async (req: Request, res: Response) => {
    // console.log(req, "req.body")
    
    // console.log(req.file)
    try {

        try {
            const reqParam = req.body;
            // const file = req.body
            // console.log(reqParam, "name");

            const entityManager = getManager();

            const data = await entityManager.insert(Contact, {
                name: reqParam.name,
                phone: reqParam.phone,
                subject: reqParam.subject,
                message: reqParam.message,
                // file
            })
            console.log("data", data);
            res.send(data);

            const locals = {
                name: reqParam.name,
                phone: reqParam.phone,
                subject: reqParam.subject,
                message: reqParam.message,
            }
            const pug = require("pug")
            let html = pug.renderFile("src/views/hello.pug", locals)

            const cpUpload = upload.single('file')

            const mailOptions = {
                from: "mitesh.saresa@mindinventory.com",
                to: "mitesh.saresa@mindinventory.com",
                subject: "Contact Us Email",
                text: "successful",
                html: html,
                headers: { 'x-myheader': 'test header' },
                // attachments: [
                //     {
                //         filename: ""
                //     }
                // ],
            }

            const info = transporter.sendMail(mailOptions)
            console.log("Message sent: %s", (await info).messageId);

            // const getAllMails = await entityManager.createQueryBuilder(Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").orderBy("created_date", "DESC").take(2).skip(0).getMany()
            // console.log("getAllMails>>>>>>", getAllMails);

            // res.send(getAllMails)
        } catch (error) {
            return apiResponse.errorResponseData(res, error);
        }

        const entityManager = getManager();
        const page: number = parseInt(req.query.page as any) || 1;
        const take = 2;
        const getAllMails = await entityManager.createQueryBuilder(Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").addSelect("contact.subject").orderBy("created_date", "DESC").take(2).skip(0).getMany()
        console.log("getAllMails>>>>>>", getAllMails);

        return apiResponse.successResponseData(res, getAllMails);
    } catch (error) {

    }
}
