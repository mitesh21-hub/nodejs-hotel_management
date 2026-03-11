"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
require("dotenv").config;
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
var express = require("express");
var typeorm_1 = require("typeorm");
var indexRoutes_1 = require("./routes/indexRoutes");
var authRoutes_1 = require("./routes/authRoutes");
var Hotels_1 = require("./entity/Hotels");
var Users_1 = require("./entity/Users");
var Rooms_1 = require("./entity/Rooms");
var Bookings_1 = require("./entity/Bookings");
var Contact_1 = require("./entity/Contact");
var formidablewere = require('express-formidable');
var multiparty = require('multiparty');
var app = express();
var port = process.env.PORT || 8000;
(0, typeorm_1.createConnection)({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mind",
    database: "hotel_management_ts",
    synchronize: true,
    entities: [Hotels_1.Hotels, Users_1.Users, Rooms_1.Rooms, Bookings_1.Bookings, Contact_1.Contact],
    logging: false
}).then(function () {
    console.log("DB connected");
}).catch(function (e) {
    console.log(e, "Error");
});
// Call midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cors());
// CORS permission
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, multipart/form-data");
//   next();
// });
var form = new multiparty.Form();
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Orgin, Content-Type, Accept, Authorization");
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });
app.use("/api/v1/user", authRoutes_1.default);
app.use("/", indexRoutes_1.default);
app.use(formidablewere());
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.get("/", function (req, res) {
    res.send("Welcome to Hotel booking website");
});
app.get("/hotel", function (req, res) {
    res.status(200).render("hello.pug");
});
app.listen(port, function () {
    console.log("Server started on port ", port);
    console.log("DB connected to ", process.env.DB_HOST);
});
//# sourceMappingURL=server.js.map