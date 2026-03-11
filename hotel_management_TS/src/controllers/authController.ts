import "reflect-metadata";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
const apiResponse = require("../services/apiResponse.js");
import { getManager, CreateDateColumn } from 'typeorm';
import { Users } from "../entity/Users";
import * as nodemailer from 'nodemailer';
import transporter from '../services/mailer';
const cron = require("node-cron");
const fs = require("fs")

// const jade = require("jade")
import jade from "jade"
import { Contact } from '../entity/Contact';
const path = require("path");
// cron.schedule("*/10 * * * * *", () => {
//   console.log("Welcome");

// })

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Get user input
    const {
      user_name,
      user_email,
      user_phone,
      user_gender,
      user_age,
      user_IDProof,
      user_password,
    } = req.body;

    const id = parseInt(req.params.id);
    // Validate user input

    if (
      !(
        user_name &&
        user_email &&
        user_password &&
        user_phone &&
        user_gender &&
        user_age &&
        user_IDProof
      )
    ) {
      return apiResponse.errorResponseData(res);
    }

    else {
      const entityManager = getManager();
      const oldUser = await entityManager.findOneBy(Users, {
        user_email,
      });
      if (oldUser) {
        return apiResponse.errorResponseData(res, "User already exist please login");
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(user_password, 10);

      // Create user in our database
      const user = await entityManager.insert(Users, {
        user_name,
        user_phone,
        user_gender,
        user_age,
        user_IDProof,
        user_email: user_email.toLowerCase(),
        user_password: encryptedPassword,
      });

      const locals = {
        name: user_name
      }
      const pug = require("pug")
      let html = pug.renderFile("src/views/index2.pug", locals)

      const mailOptions = {
        from: "mitesh.saresa@mindinventory.com",
        to: user_email,
        subject: "Success Message",
        text: "Registration successful.",
        html: html,
        locals,
        headers: { 'x-myheader': 'test header' },
      }

      const info = transporter.sendMail(mailOptions)
      console.log("Message sent: %s", (await info).messageId);

      return apiResponse.successResponseData(res, user);
    }

  } catch (err) {
    return apiResponse.errorResponseData(res, err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;
    const entityManager = getManager();

    if (!(user_email && user_password)) {
      return apiResponse.errorResponseData(res, "all fields are required");
    }
    const user = await entityManager.findOneBy(Users, {
      user_email,
    });
    if (user && (await bcrypt.compare(user_password, user.user_password))) {
      // Create token
      const token = jwt.sign(
        { userId: user.id, user_email },
        process.env.TOKEN_KEY,
        {
          expiresIn: 864000,
        }
      );

      // user
      return apiResponse.successResponseData(res, { token: token });
    }
  } catch (error) {
    return apiResponse.errorResponseData(res, error);
  }
};

export const myDetails = async (req: Request, res: Response) => {

  const id: any = res.locals.Users;
  console.log("id>>>>>>.", id);

  const entityManager = getManager();
  // await entityManager
  //   .findOneBy(Users, {
  //     id,

  //   })

  await entityManager
    .createQueryBuilder(Users, "users")
    .select("users.user_name")
    .addSelect("users.user_email")
    .addSelect("users.user_phone")
    .addSelect("users.user_age")
    .addSelect("users.user_gender")
    .addSelect("users.user_IDProof")
    .where("id=:id", { id: id })
    .getOne()
    .then((result) => {
      if (!result) {
        return apiResponse.errorResponseData(res, "Error finding data");
      }
      console.log(result, "result>>>>>>>>");

      return apiResponse.successResponseData(res, result);
    })
    .catch((err) => {
      return apiResponse.errorResponseData(res, err);
    });
};

// export const contactUs = async (req: Request, res: Response) => {
//   try {
//     const { name, phone, subject, message } = req.body;
//     const entityManager = getManager();

//     const data = await entityManager.insert(Contact, {
//       name,
//       phone,
//       subject,
//       message,
//     })
//     res.send(data);

//     const mailOptions = {
//       from: "mitesh.saresa@mindinventory.com",
//       to: "mitesh.saresa@mindinventory.com",
//       subject: "Success Message",
//       text: "successful",
//       html: "<b>Hello There!</b>",
//       headers: { 'x-myheader': 'test header' },
//       attachments: [{
//         filename: 'hotel_booking.png',
//         path: "src/images/hotel_booking.png",
//       }]
//     }

//     const info = transporter.sendMail(mailOptions)
//     console.log("Message sent: %s", (await info).messageId);

//     // const getAllMails = await entityManager.createQueryBuilder(Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").orderBy("created_date", "DESC").take(2).skip(0).getMany()
//     // console.log("getAllMails>>>>>>", getAllMails);

//     // res.send(getAllMails)
//   } catch (error) {
//     return apiResponse.errorResponseData(res, error);
//   }
// }

// export const getMails = async (req: Request, res: Response) => {
//   try {
//     const entityManager = getManager();
//     const getAllMails = await entityManager.createQueryBuilder(Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").orderBy("created_date", "DESC").take(5).skip(0).getMany()
//     console.log("getAllMails>>>>>>", getAllMails);

//     res.send({ data: getAllMails })
//   } catch (error) {

//   }
// }
