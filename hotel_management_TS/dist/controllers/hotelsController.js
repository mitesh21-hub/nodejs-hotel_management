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
exports.hotelSearch = exports.getListOfHotels = exports.createHotel = void 0;
require("reflect-metadata");
var Hotels_1 = require("../entity/Hotels");
var typeorm_1 = require("typeorm");
var apiResponse = require("../services/apiResponse.js");
var createHotel = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, _a, hotel_name, hotel_address, hotel_phone, hotel_amenities, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                entityManager = (0, typeorm_1.getManager)();
                _a = req.body, hotel_name = _a.hotel_name, hotel_address = _a.hotel_address, hotel_phone = _a.hotel_phone, hotel_amenities = _a.hotel_amenities;
                return [4 /*yield*/, entityManager.insert(Hotels_1.Hotels, {
                        hotel_name: hotel_name, hotel_address: hotel_address, hotel_phone: hotel_phone, hotel_amenities: hotel_amenities
                    })];
            case 1:
                data = _b.sent();
                return [2 /*return*/, apiResponse.successResponseData(res, data)];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createHotel = createHotel;
var getListOfHotels = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, page, take, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                entityManager = (0, typeorm_1.getManager)();
                page = parseInt(req.query.page) || 1;
                take = 2;
                return [4 /*yield*/, entityManager.find(Hotels_1.Hotels, {
                        take: take,
                        skip: (page - 1) * take
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, apiResponse.successResponseData(res, data)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getListOfHotels = getListOfHotels;
var hotelSearch = function (req, res, args) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, searchData, _a, hotel_name, hotel_address, hotel_phone, hotel_amenities, data, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                entityManager = (0, typeorm_1.getManager)();
                searchData = {};
                _a = req.query, hotel_name = _a.hotel_name, hotel_address = _a.hotel_address, hotel_phone = _a.hotel_phone, hotel_amenities = _a.hotel_amenities;
                return [4 /*yield*/, entityManager.createQueryBuilder(Hotels_1.Hotels, "hotels").where("hotels.hotel_name like :name", { name: "%".concat(hotel_name, "%") }).orWhere("hotels.hotel_address like :address", { address: "%".concat(hotel_address, "%") }).orWhere("hotels.hotel_phone like :phone", { phone: "%".concat(hotel_phone, "%") }).orWhere("hotels.hotel_amenities like :amenities", { amenities: "%".concat(hotel_amenities, "%") })
                        .getMany()];
            case 1:
                data = _b.sent();
                return [2 /*return*/, apiResponse.successResponseData(res, data)];
            case 2:
                error_3 = _b.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.hotelSearch = hotelSearch;
//# sourceMappingURL=hotelsController.js.map