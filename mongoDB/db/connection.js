require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);

const url = `mongodb+srv://${username}:${password}@cluster0.4f84sjn.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(url);

const dbConnection = MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err || !db) {
      throw err;
    }
    console.log("Database connected!");
    return db;
  }
);

const faker = require("faker");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL

  const client = new MongoClient(url, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
  });

  try {
      await client.connect();
      console.log("Connected correctly to server");

      const collection = client.db("hotel_booking").collection("hotels")

      // The drop() command destroys all data from a collection.
      // Make sure you run it against proper database and collection.
      collection.drop();
      collection.insertMany(hotels);
  }
  catch (err) {
    console.log(err.stack);
}
}
seedDB();

module.exports = dbConnection;