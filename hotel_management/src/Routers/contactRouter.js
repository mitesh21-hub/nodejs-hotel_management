const formidableMiddleware = require("express-formidable");
const contactRoute = require("express").Router();

contactRoute.use(formidableMiddleware({
    encoding: "utf-8",
    uploadDir: "src/uploads",
    multiples: true, // req.files to be arrays of files
  }));
const contactValidation = require("../validator/contactValidator");

const { getMails } = require("../Controllers/contactController/contactController");

// contactRoute.post("/", contactUs);
contactRoute.post("/emails", contactValidation, getMails, (req, res, next)=>{
    req.fields; // contains non-file fields
    req.files; // contains files
    next();
});

module.exports = contactRoute;
