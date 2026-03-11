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
exports.myDetails = exports.loginUser = exports.registerUser = void 0;
require("reflect-metadata");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var apiResponse = require("../services/apiResponse.js");
var typeorm_1 = require("typeorm");
var Users_1 = require("../entity/Users");
var mailer_1 = require("../services/mailer");
var cron = require("node-cron");
var fs = require("fs");
var path = require("path");
// cron.schedule("*/10 * * * * *", () => {
//   console.log("Welcome");
// })
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, user_email, user_phone, user_gender, user_age, user_IDProof, user_password, id, entityManager, oldUser, encryptedPassword, user, locals, pug, html, mailOptions, info, _b, _c, _d, err_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 7, , 8]);
                _a = req.body, user_name = _a.user_name, user_email = _a.user_email, user_phone = _a.user_phone, user_gender = _a.user_gender, user_age = _a.user_age, user_IDProof = _a.user_IDProof, user_password = _a.user_password;
                id = parseInt(req.params.id);
                if (!!(user_name &&
                    user_email &&
                    user_password &&
                    user_phone &&
                    user_gender &&
                    user_age &&
                    user_IDProof)) return [3 /*break*/, 1];
                return [2 /*return*/, apiResponse.errorResponseData(res)];
            case 1:
                entityManager = (0, typeorm_1.getManager)();
                return [4 /*yield*/, entityManager.findOneBy(Users_1.Users, {
                        user_email: user_email,
                    })];
            case 2:
                oldUser = _e.sent();
                if (oldUser) {
                    return [2 /*return*/, apiResponse.errorResponseData(res, "User already exist please login")];
                }
                return [4 /*yield*/, bcrypt.hash(user_password, 10)];
            case 3:
                encryptedPassword = _e.sent();
                return [4 /*yield*/, entityManager.insert(Users_1.Users, {
                        user_name: user_name,
                        user_phone: user_phone,
                        user_gender: user_gender,
                        user_age: user_age,
                        user_IDProof: user_IDProof,
                        user_email: user_email.toLowerCase(),
                        user_password: encryptedPassword,
                    })];
            case 4:
                user = _e.sent();
                locals = {
                    name: user_name
                };
                pug = require("pug");
                html = pug.renderFile("src/views/index2.pug", locals);
                mailOptions = {
                    from: "mitesh.saresa@mindinventory.com",
                    to: user_email,
                    subject: "Success Message",
                    text: "Registration successful.",
                    html: html,
                    locals: locals,
                    headers: { 'x-myheader': 'test header' },
                };
                info = mailer_1.default.sendMail(mailOptions);
                _c = (_b = console).log;
                _d = ["Message sent: %s"];
                return [4 /*yield*/, info];
            case 5:
                _c.apply(_b, _d.concat([(_e.sent()).messageId]));
                return [2 /*return*/, apiResponse.successResponseData(res, user)];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _e.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, err_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_email, user_password, entityManager, user, _b, token, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, user_email = _a.user_email, user_password = _a.user_password;
                entityManager = (0, typeorm_1.getManager)();
                if (!(user_email && user_password)) {
                    return [2 /*return*/, apiResponse.errorResponseData(res, "all fields are required")];
                }
                return [4 /*yield*/, entityManager.findOneBy(Users_1.Users, {
                        user_email: user_email,
                    })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt.compare(user_password, user.user_password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    token = jwt.sign({ userId: user.id, user_email: user_email }, process.env.TOKEN_KEY, {
                        expiresIn: 864000,
                    });
                    // user
                    return [2 /*return*/, apiResponse.successResponseData(res, { token: token })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_1)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var myDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, entityManager;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = res.locals.Users;
                console.log("id>>>>>>.", id);
                entityManager = (0, typeorm_1.getManager)();
                // await entityManager
                //   .findOneBy(Users, {
                //     id,
                //   })
                return [4 /*yield*/, entityManager
                        .createQueryBuilder(Users_1.Users, "users")
                        .select("users.user_name")
                        .addSelect("users.user_email")
                        .addSelect("users.user_phone")
                        .addSelect("users.user_age")
                        .addSelect("users.user_gender")
                        .addSelect("users.user_IDProof")
                        .where("id=:id", { id: id })
                        .getOne()
                        .then(function (result) {
                        if (!result) {
                            return apiResponse.errorResponseData(res, "Error finding data");
                        }
                        console.log(result, "result>>>>>>>>");
                        return apiResponse.successResponseData(res, result);
                    })
                        .catch(function (err) {
                        return apiResponse.errorResponseData(res, err);
                    })];
            case 1:
                // await entityManager
                //   .findOneBy(Users, {
                //     id,
                //   })
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.myDetails = myDetails;
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
//# sourceMappingURL=authController.js.map