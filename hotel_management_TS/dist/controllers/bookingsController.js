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
exports.myBookings = exports.getListOfBookings = exports.createBooking = void 0;
require("reflect-metadata");
var Hotels_1 = require("../entity/Hotels");
var typeorm_1 = require("typeorm");
var Bookings_1 = require("../entity/Bookings");
var data_source_1 = require("../data-source");
var Rooms_1 = require("../entity/Rooms");
var apiResponse = require("../services/apiResponse.js");
var _a = require("../schema/hotelSchema.js"), hotelschema = _a.hotelschema, roomSchema = _a.roomSchema, bookingSchema = _a.bookingSchema;
var transformer = require("object-transformer");
var createBooking = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, id, booking_date, hotelData, roomData, _a, check_in, check_out, userId, roomsId, hotelsId, isBookingExist, randomstr, bookingNumber, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                entityManager = (0, typeorm_1.getManager)();
                id = parseInt(req.params.id);
                booking_date = new Date();
                return [4 /*yield*/, entityManager.createQueryBuilder(Hotels_1.Hotels, "hotels").select("hotels.hotel_name").where("hotels.id=:id", { id: id }).getOne()];
            case 1:
                hotelData = _b.sent();
                if (!hotelData) {
                    return [2 /*return*/, apiResponse.errorResponseWithoutData(res, "No hotel data found")];
                }
                return [4 /*yield*/, entityManager.createQueryBuilder(Rooms_1.Rooms, "rooms").select("rooms.room_number").where("rooms.id=:id", { id: id })
                        // .andWhere("rooms.hotelsId=:hotelsId", { hotelsId: id })
                        .getOne()];
            case 2:
                roomData = _b.sent();
                if (!roomData) {
                    return [2 /*return*/, apiResponse.errorResponseData(res, "No room data found")];
                }
                _a = req.body, check_in = _a.check_in, check_out = _a.check_out, userId = _a.userId, roomsId = _a.roomsId, hotelsId = _a.hotelsId;
                return [4 /*yield*/, entityManager.createQueryBuilder(Bookings_1.Bookings, "bookings").where("bookings.hotelsId=:hotelsId", { hotelsId: hotelsId }).andWhere("bookings.roomsId=:roomsId", { roomsId: roomsId }).getOne()];
            case 3:
                isBookingExist = _b.sent();
                if (isBookingExist) 
                // if (isBookingExist && new Date(check_out) > new Date(check_in))
                {
                    return [2 /*return*/, apiResponse.errorResponseData(res, "booking already exist")];
                }
                if (check_out < new Date().toString() && check_in < new Date().toString() && check_in > check_out) {
                    return [2 /*return*/, apiResponse.errorResponseData(res, "invalid checkin checkout date")];
                }
                randomstr = Math.floor(Math.random() * 10000);
                bookingNumber = "".concat(hotelData.hotel_name.substring(0, 3), "-").concat(roomData.room_number, "-").concat(randomstr);
                return [4 /*yield*/, entityManager.insert(Bookings_1.Bookings, {
                        booking_number: bookingNumber, check_in: check_in, check_out: check_out, userId: userId, roomsId: roomsId, hotelsId: hotelsId
                    })];
            case 4:
                data = _b.sent();
                return [2 /*return*/, apiResponse.successResponseData(res, data)];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createBooking = createBooking;
var getListOfBookings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, bookingRepository, page, take, data, list, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                entityManager = (0, typeorm_1.getManager)();
                bookingRepository = data_source_1.AppDataSource.getRepository(Bookings_1.Bookings);
                page = parseInt(req.query.page) || 1;
                take = 10;
                return [4 /*yield*/, entityManager.createQueryBuilder(Bookings_1.Bookings, "bookings")
                        .leftJoinAndSelect('bookings.hotels', 'hotels')
                        .leftJoinAndSelect('bookings.rooms', 'rooms')
                        .take(5).skip(0)
                        .getMany()];
            case 1:
                data = _a.sent();
                list = new transformer.List(data, {
                    id: "id",
                    booking_number: "booking_number",
                    booking_date: "booking_date",
                    check_in: "check_in",
                    check_out: "check_out",
                    hotel_name: "hotels.hotel_name",
                    hotel_amenities: "hotels.hotel_amenities",
                    room_number: "rooms.room_number",
                    room_type: "rooms.room_type",
                    room_amenities: "rooms.room_amenities",
                }).parse();
                return [2 /*return*/, apiResponse.successResponseData(res, list)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getListOfBookings = getListOfBookings;
var myBookings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entityManager, id, data, list, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                entityManager = (0, typeorm_1.getManager)();
                id = res.locals.Users;
                return [4 /*yield*/, entityManager.createQueryBuilder(Bookings_1.Bookings, "bookings")
                        .leftJoinAndSelect('bookings.hotels', 'hotels')
                        .leftJoinAndSelect('bookings.rooms', 'rooms')
                        .where("bookings.userId=:id", { id: id })
                        .take(3).skip(0)
                        .getMany()];
            case 1:
                data = _a.sent();
                list = new transformer.List(data, {
                    id: "id",
                    booking_number: "booking_number",
                    booking_date: "booking_date",
                    check_in: "check_in",
                    check_out: "check_out",
                    hotel_name: "hotels.hotel_name",
                    hotel_amenities: "hotels.hotel_amenities",
                    room_number: "rooms.room_number",
                    room_type: "rooms.room_type",
                    room_amenities: "rooms.room_amenities",
                }).parse();
                return [2 /*return*/, apiResponse.successResponseData(res, list)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, apiResponse.errorResponseData(res, error_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.myBookings = myBookings;
//# sourceMappingURL=bookingsController.js.map