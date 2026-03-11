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
exports.Bookings = void 0;
var typeorm_1 = require("typeorm");
var Rooms_1 = require("./Rooms");
var Hotels_1 = require("./Hotels");
var Users_1 = require("./Users");
var Bookings = /** @class */ (function () {
    function Bookings() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Bookings.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "booking_number", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "booking_date", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "check_in", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "check_out", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Bookings.prototype, "hotelsId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Bookings.prototype, "roomsId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Bookings.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "createDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Bookings.prototype, "update_date", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Rooms_1.Rooms; }, function (rooms) { return rooms.id; }),
        __metadata("design:type", Rooms_1.Rooms)
    ], Bookings.prototype, "rooms", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (user) { return user.id; }),
        __metadata("design:type", Users_1.Users)
    ], Bookings.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Hotels_1.Hotels; }, function (hotels) { return hotels.id; }) // specify inverse side as a second parameter
        // @JoinColumn()
        ,
        __metadata("design:type", Hotels_1.Hotels)
    ], Bookings.prototype, "hotels", void 0);
    Bookings = __decorate([
        (0, typeorm_1.Entity)({ name: "Bookings" })
    ], Bookings);
    return Bookings;
}());
exports.Bookings = Bookings;
//# sourceMappingURL=Bookings.js.map