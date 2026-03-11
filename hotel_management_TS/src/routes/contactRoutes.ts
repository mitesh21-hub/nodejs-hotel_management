const formidableMiddleware = require("express-formidable");
import { Router } from "express";
import storage from '../middleware/fileUpload';
import upload from "../middleware/fileUpload";
import { contactValidation } from "../validator/contactValidator";
const contactRoute = Router();
contactRoute.use(formidableMiddleware({
    encoding: "utf-8",
    uploadDir: "src/uploads",
    multiples: true, // req.files to be arrays of files
  }));

import {
    getMails,
    contactUs
} from "../controllers/contactController"

const cpUpload = upload.single('filename')
contactRoute.post("/", contactValidation, contactUs);
contactRoute.post("/emails", contactValidation, getMails);

export default contactRoute;