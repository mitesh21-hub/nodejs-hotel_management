"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = exports.room_type = void 0;
var typeorm_1 = require("typeorm");
var Hotels_1 = require("./Hotels");
var Bookings_1 = require("./Bookings");
var room_type;
(function (room_type) {
    room_type["Single_Bed"] = "Single Bed";
    room_type["Double_Bed"] = "Double Bed";
    room_type["King_Size_Bed"] = "King size Bed";
})(room_type = exports.room_type || (exports.room_type = {}));
var Rooms = /** @class */ (function () {
    function Rooms() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Rooms.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rooms.prototype, "room_number", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: room_type,
            default: room_type.King_Size_Bed,
        }),
        __metadata("design:type", String)
    ], Rooms.prototype, "room_type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rooms.prototype, "room_desc", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rooms.prototype, "room_amenities", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Rooms.prototype, "room_price", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Rooms.prototype, "hotelsId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Rooms.prototype, "createDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Rooms.prototype, "update_date", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Hotels_1.Hotels; }, function (hotels) { return hotels.id; }),
        __metadata("design:type", Hotels_1.Hotels)
    ], Rooms.prototype, "hotels", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Bookings_1.Bookings; }, function (bookings) { return bookings.id; }),
        __metadata("design:type", Bookings_1.Bookings)
    ], Rooms.prototype, "bookings", void 0);
    Rooms = __decorate([
        (0, typeorm_1.Entity)({ name: "Rooms" })
    ], Rooms);
    return Rooms;
}());
exports.Rooms = Rooms;
//# sourceMappingURL=Rooms.js.map