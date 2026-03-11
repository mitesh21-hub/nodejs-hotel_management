require("dotenv").config();
const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);

const url = `mongodb+srv://${username}:${password}@cluster0.4f84sjn.mongodb.net/hotel_booking`;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const hotelsRoute = require("./src/routes/hotelRoute");
const roomsRoute = require("./src/routes/roomRoutes");
const bookingRoute = require("./src/routes/bookingRoute");
const authRoute = require("./src/routes/authRoutes")
const mongoose = require('mongoose');
const contactRoute = require("./src/routes/contactRoutes");
mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();

const port = process.env.PORT || 7000;
const host = "localhost"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/users", authRoute);
app.use("/api/v1/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Hotel booking website");
});


app.listen(port, () => {
  console.log("Server started on port ", port);
});
