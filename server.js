const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200/",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("<h2>API is Running!</h2>");
});

// GET route - Allows to get all the items
app.get("/api/user", (req, res) => {
  res.status(200).json({ id: 1, name: "admin" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const mongoConnectionString =
  "mongodb+srv://admin:0OmQBJYlAKp8ACJy@cluster0913.aspusjs.mongodb.net/?retryWrites=true&w=majority";
const mongoDBName = "Database0913";
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: false,
  dbName: mongoDBName,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("<h2>API is Running!</h2>");
});

const userSchema = new mongoose.Schema({ id: Number, name: String });
const userModal = mongoose.model("users", userSchema, "users");
app.get("/api/users", async (req, res) => {
  userModal
    .find()
    .then(function (users) {
      console.log("users: ", users);
      res.json(users);
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
});