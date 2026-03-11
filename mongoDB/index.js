require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const bookingSchema = require("./src/data/bookings")
const Hotel = require("./src/models/hotels");


const url = `mongodb+srv://${username}:${password}@cluster0.4f84sjn.mongodb.net/?retryWrites=true&w=majority`;

let dbConnection;
const client = new MongoClient(url);

MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err || !db) {
      throw err;
    }


    // addHotels = db
    //   .db("hotel_booking")
    //   .collection("hotels")
    //   .insertMany(hotels, function (err, res) {
    //     if (err) throw err;
    //   });

    //   addRooms = db
    //   .db("hotel_booking")
    //   .collection("rooms")
    //   .insertMany(rooms, function (err, res) {
    //     if (err) throw err;
    //   });

// addBooking = db
//       .db("hotel_booking")
//       .collection("bookings")
//       .insertMany(bookings, function (err, res) {
//         if (err) throw err;
//       });

      // deleteHotel = db.db("hotel_booking").collection("hotels").deleteOne({hotel_name: "Holly House"},function (err, _result) {
      //   if (err) {
      //     res.status(400).send(`Error deleting listing with id!`);
      //   } else {
      //     console.log("1 document deleted");
      //   }
      // });

      findHotels = db.db("hotel_booking").collection("hotels").find({
        function (err, res) {
            if (err) throw err;
        }
          });
      console.log("Database connected!");
    
      return db;
  }
);

let hotels = [
  {
    hotel_name: "Crowne Plaza",
    hotel_address: "Crowne Plaza, Ahmedabad",
    hotel_phone: "9876543210",
    hotel_amenities: ["Swimming pool, Vehicle"],
  },
  {
    hotel_name: "Hotel Bliss",
    hotel_address: "Hotel Bliss, Ahmedabad",
    hotel_phone: "8956243174",
    hotel_amenities: ["Swimming pool", "Vehicle"],
  },
  {
    hotel_name: "Ramada Limited & Suites",
    hotel_address: "Ramada Limited & Suites, Ahmedabad",
    hotel_phone: "6589745623",
    hotel_amenities: ["Room service, Vehicle"],
  },
  {
    hotel_name: "Hotel Elite",
    hotel_address: "Hotel Elite, Ahmedabad",
    hotel_phone: "9856742536",
    hotel_amenities: ["Room service"],
  },
  {
    hotel_name: "Lake Place Inn",
    hotel_address: "Lake Place Inn, Ahmedabad",
    hotel_phone: "8965237410",
    hotel_amenities: ["Room service"],
  },
  {
    hotel_name: "Holly House",
    hotel_address: "Holly House, Ahmedabad",
    hotel_phone: "7896542135",
    hotel_amenities: ["Swimming pool"],
  }
];
let rooms = [
  {
    room_number: "401",
    room_type: "King Size Bed",
    room_desc: "Deluxe King Size Bed room with TV",
    room_amenities: ["TV", "wifi"],
    hotel_id: ObjectId("6320360d872a657a54f90e20"),
  },
  {
    room_number: "402",
    room_type: "Double Bed",
    room_desc: "Deluxe Double Bed room with TV",
    room_amenities: ["TV", "wifi"],
    hotel_id: ObjectId("6320360d872a657a54f90e20"),
  }
];

let bookings = [
{
booking_number: "Hot-205-1234",
booking_date: "2022-09-13T12:35:23.000Z",
check_in: "2022-10-01T12:35:23.000Z",
check_out: "2022-10-02T12:35:23.000Z",
room_id: ObjectId("63207271410f8b196a06303c"),
hotel_id: ObjectId("63207c165cb1bc76c5f5c974"),
user_id: ObjectId("6320360d872a657a54f90e22")
}
];


const addMultipleDocs = async() => {
  try {
    const db = client.db("hotel_booking");
    await db.collection('hotels').createIndex({
      hotel_name: 1,
      hotel_address: 1
    }, {
      unique: true
    });
    await db.collection('hotels').insertMany(hotels);
    console.log('Multiple Docs Added!');
    
  } catch (e) {
    console.log("duplicate entry");
  }
};
addMultipleDocs()


