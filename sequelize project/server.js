require("dotenv").config();
require("./src/config/config");
const IndexRoute = require("./src/Routers/IndexRoute");
const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./src/Routers/authRouter");
// const authenticationRoute = require("./src/Routers/authenticationRouter")
// const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const formidableMiddleware = require("express-formidable");
// const { initiazingPassport } = require("./src/Middlewares/authentication/passport");
const app = Express();

// defining port
const port = process.env.PORT || 7000;
// initiazingPassport(passport);
// For parsing the express payloads
// For Passport
app.use(session({
  secret: "secret",
  resave: true, 
  saveUninitialized:true
  })); // session secret
app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session()); 
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(Express.static(__dirname +"/public")); 
app.use(cors());


// CORS permission
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

app.use("/", IndexRoute);
app.use("/", authRoute);
app.use(formidableMiddleware({
  encoding: "utf-8",
  uploadDir: "src/uploads",
  // multiples: true, // req.files to be arrays of files
}));
app.use(Express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to Hotel booking website");
});


app.listen(port, () => {
  console.log("Server started on port ", port);
  console.log("DB connected to ", process.env.DB_HOST);
});
