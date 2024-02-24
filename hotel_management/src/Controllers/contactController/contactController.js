const Models = require("../../models");
const apiResponse = require("../../services/apiResponse.js");
const transporter = require("../../services/mailer");
const fs = require("fs");
const path = require("path");
const formidable = require("express-formidable");

module.exports = {
  /**
   * @description this function for the details of users.
   * @param req
   * @param res
   */
  getMails: async (req, res) => {


    try {
      const name = req.fields.name;
      const phone = req.fields.phone;
      const subject = req.fields.subject;
      const message = req.fields.message;
      
      console.log("subject>>>>>>>.", typeof subject);

      const attachment = req.files;

      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      // const maxSize = 1 * 1024 * 1024; // for 1MB
      const fileExtension = attachment.attachment.name.split(".").pop();

      if(!allowedExtensions.includes(fileExtension)){
        this.value = null;
        return apiResponse.errorResponseData(res, "invalid filetype");
      }
      // if (attachment.attachment.size>maxSize) {
      //   return apiResponse.errorResponseData(res, "file size too large");
      // }

      const page = req.query.page;
      const limit = req.query.limit || 3;
      const offset = page ? (page - 1) * limit : 0;

      const data = await Models.Contacts.create({
        name: name,
        phone: phone,
        subject: subject,
        message: message,
      });

      const locals = {
        name: name,
        phone: phone,
        subject: subject,
        message: message,
      };
      const pug = require("pug");
      let html = pug.renderFile("src/views/hello.pug", locals);

      const mailOptions = {
        from: "mitesh.saresa@mindinventory.com",
        to: "mitesh.saresa@mindinventory.com",
        subject: "Contact Us Email",
        text: "successful",
        html: html,
        headers: { "x-myheader": "test header","Content-Type": "multipart/form-data" },
        attachments: [{
          filename: attachment.attachment.name,
          path: attachment.attachment.path
        }],
      };

      const info = transporter.sendMail(mailOptions);

      const getAllMails = await Models.Contacts.findAll({
        offset: offset,
        limit: limit,
        order: [
          ["createdAt", "DESC"],
      ],
      });
      return apiResponse.successResponseData(res, getAllMails);
    } catch (e) {
      console.log(e,"e>>>>>>>>>>>>>>>");
      return apiResponse.errorResponseData(res);
    }
  },
};
