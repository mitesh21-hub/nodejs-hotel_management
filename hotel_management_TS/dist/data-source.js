"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Users_1 = require("./entity/Users");
var Hotels_1 = require("./entity/Hotels");
var Rooms_1 = require("./entity/Rooms");
var Bookings_1 = require("./entity/Bookings");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "mind",
    database: "hotel_management_ts",
    synchronize: true,
    logging: false,
    entities: [Users_1.Users, Hotels_1.Hotels, Rooms_1.Rooms, Bookings_1.Bookings],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map