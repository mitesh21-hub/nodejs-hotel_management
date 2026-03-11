"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMails = exports.contactUs = void 0;
require("reflect-metadata");
var apiResponse = require("../services/apiResponse.js");
var typeorm_1 = require("typeorm");
var mailer_1 = require("../services/mailer");
var Contact_1 = require("../entity/Contact");
var fileUpload_1 = require("../middleware/fileUpload");
var contactUs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, phone, subject, message, entityManager, data, mailOptions, info, _b, _c, _d, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                _a = req.body, name = _a.name, phone = _a.phone, subject = _a.subject, message = _a.message;
                entityManager = (0, typeorm_1.getManager)();
                console.log("data>>>>", req.body);
                return [4 /*yield*/, entityManager.insert(Contact_1.Contact, {
                        name: name,
                        phone: phone,
                        subject: subject,
                        message: message,
                    })];
            case 1:
                data = _e.sent();
                res.send(data);
                mailOptions = {
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
                };
                info = mailer_1.default.sendMail(mailOptions);
                _c = (_b = console).log;
                _d = ["Message sent: %s"];
                return [4 /*yield*/, info];
            case 2:
                _c.apply(_b, _d.concat([(_e.sent()).messageId]));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _e.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.contactUs = contactUs;
var getMails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqParam, entityManager_1, data, locals, pug, html, cpUpload, mailOptions, info, _a, _b, _c, error_2, entityManager, page, take, getAllMails, error_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                reqParam = req.body;
                entityManager_1 = (0, typeorm_1.getManager)();
                return [4 /*yield*/, entityManager_1.insert(Contact_1.Contact, {
                        name: reqParam.name,
                        phone: reqParam.phone,
                        subject: reqParam.subject,
                        message: reqParam.message,
                        // file
                    })];
            case 2:
                data = _d.sent();
                console.log("data", data);
                res.send(data);
                locals = {
                    name: reqParam.name,
                    phone: reqParam.phone,
                    subject: reqParam.subject,
                    message: reqParam.message,
                };
                pug = require("pug");
                html = pug.renderFile("src/views/hello.pug", locals);
                cpUpload = fileUpload_1.default.single('file');
                mailOptions = {
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
                };
                info = mailer_1.default.sendMail(mailOptions);
                _b = (_a = console).log;
                _c = ["Message sent: %s"];
                return [4 /*yield*/, info];
            case 3:
                _b.apply(_a, _c.concat([(_d.sent()).messageId]));
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_2)];
            case 5:
                entityManager = (0, typeorm_1.getManager)();
                page = parseInt(req.query.page) || 1;
                take = 2;
                return [4 /*yield*/, entityManager.createQueryBuilder(Contact_1.Contact, "contact").select("contact.name").addSelect("contact.phone").addSelect("contact.created_date").addSelect("contact.subject").orderBy("created_date", "DESC").take(2).skip(0).getMany()];
            case 6:
                getAllMails = _d.sent();
                console.log("getAllMails>>>>>>", getAllMails);
                return [2 /*return*/, apiResponse.successResponseData(res, getAllMails)];
            case 7:
                error_3 = _d.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getMails = getMails;
//# sourceMappingURL=contactController.js.map