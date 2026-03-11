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
exports.bookingValidation = void 0;
var Joi = require("joi");
var apiResponse = require("../services/apiResponse.js");
var bookingValidation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookingSchema, options, _a, error, value, validationMessageKey;
    return __generator(this, function (_b) {
        bookingSchema = Joi.object({
            check_in: Joi.date().required(),
            check_out: Joi.date().required(),
            userId: Joi.number().required(),
            hotelsId: Joi.number().required(),
            roomsId: Joi.number().required(),
        });
        options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true // remove unknown props
        };
        _a = bookingSchema.validate(req.body, options), error = _a.error, value = _a.value;
        if (error) {
            validationMessageKey = function (apiTag, error) {
                var key = (error.details[0].context.key);
                // let type = error.details[0].type.split(".");
                // type = toUpperCase(type[1]);
                // key = apiTag + key + type;
                key = apiTag + key;
                return key;
            };
            return [2 /*return*/, apiResponse.errorResponseData(res, (validationMessageKey("Invalid ", error)))];
        }
        return [2 /*return*/, next()];
    });
}); };
exports.bookingValidation = bookingValidation;
//# sourceMappingURL=bookingValidator.js.map