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
exports.Contact = exports.subject = void 0;
var typeorm_1 = require("typeorm");
var subject;
(function (subject) {
    subject["INQUIRY"] = "Inquiry";
    subject["BOOKING"] = "Booking";
    subject["CANCELLATION"] = "Cancellation";
    subject["REFUND"] = "Refund";
    subject["GENERAL"] = "General";
})(subject = exports.subject || (exports.subject = {}));
var Contact = /** @class */ (function () {
    function Contact() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Contact.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Contact.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Contact.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Contact.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: subject,
        }),
        __metadata("design:type", String)
    ], Contact.prototype, "subject", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Contact.prototype, "created_date", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Contact.prototype, "updated_date", void 0);
    Contact = __decorate([
        (0, typeorm_1.Entity)({ name: "Contact" })
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map