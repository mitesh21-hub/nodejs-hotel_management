import * as dotenv from "dotenv";
require("dotenv").config
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm"
import * as cors from "cors";
import IndexRoute from "./routes/indexRoutes";
import authRoute from "./routes/authRoutes"
import { Hotels } from "./entity/Hotels";
import { Users } from "./entity/Users";
import { Rooms } from './entity/Rooms';
import { Bookings } from './entity/Bookings';
import { Contact } from "./entity/Contact";
import jade from "jade"
import { resolve } from "path";
import upload from './middleware/fileUpload';

const formidableMiddleware = require('express-formidable')
const multiparty = require('multiparty');

const app: express.Application = express();


const port = process.env.PORT || 8000;



createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Mind@123",
  database: "hotel_management_ts",
  synchronize: true,
  entities: [Hotels, Users, Rooms, Bookings, Contact],
  logging: false
}).then(() => {
  console.log("DB connected");

}).catch((e) => {
  console.log(e, "Error");

})

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

const form = new multiparty.Form();

// app.use(function (req: Request, res: Response, next: NextFunction) {

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Orgin, Content-Type, Accept, Authorization");

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });


app.use("/api/v1/user", authRoute);
app.use("/", IndexRoute);
app.use(formidableMiddleware({
  encoding: "utf-8",
  uploadDir: "src/uploads",
  // multiples: true, // req.files to be arrays of files
}));
app.use(express.static(__dirname +"/public")); 
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Hotel booking website");
});

app.get("/hotel", (req: Request, res: Response) => {
  res.status(200).render("hello.pug");
});


app.listen(port, () => {
  console.log("Server started on port ", port);
  console.log("DB connected to ", process.env.DB_HOST);
});