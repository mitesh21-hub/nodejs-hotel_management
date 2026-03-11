"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fileUpload_1 = require("../middleware/fileUpload");
var contactValidator_1 = require("../validator/contactValidator");
var contactRoute = (0, express_1.Router)();
var contactController_1 = require("../controllers/contactController");
var cpUpload = fileUpload_1.default.single('filename');
contactRoute.post("/", contactValidator_1.contactValidation, contactController_1.contactUs);
contactRoute.post("/emails", contactValidator_1.contactValidation, contactController_1.getMails);
exports.default = contactRoute;
//# sourceMappingURL=contactRoutes.js.map