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
exports.Hotels = void 0;
var typeorm_1 = require("typeorm");
var Rooms_1 = require("./Rooms");
var Bookings_1 = require("./Bookings");
var Hotels = /** @class */ (function () {
    function Hotels() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Hotels.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)({ fulltext: true }),
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Hotels.prototype, "hotel_name", void 0);
    __decorate([
        (0, typeorm_1.Index)({ fulltext: true }),
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Hotels.prototype, "hotel_address", void 0);
    __decorate([
        (0, typeorm_1.Index)({ fulltext: true }),
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Hotels.prototype, "hotel_phone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Hotels.prototype, "hotel_amenities", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Hotels.prototype, "createDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Hotels.prototype, "update_date", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Rooms_1.Rooms; }, function (rooms) { return rooms.id; }),
        __metadata("design:type", Rooms_1.Rooms)
    ], Hotels.prototype, "rooms", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Bookings_1.Bookings; }, function (bookings) { return bookings.id; }) // specify inverse side as a second parameter
        // @JoinColumn()
        ,
        __metadata("design:type", Bookings_1.Bookings)
    ], Hotels.prototype, "bookings", void 0);
    Hotels = __decorate([
        (0, typeorm_1.Entity)({ name: "Hotels" })
    ], Hotels);
    return Hotels;
}());
exports.Hotels = Hotels;
//# sourceMappingURL=Hotels.js.map