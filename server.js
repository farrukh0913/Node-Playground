const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: true,
  creadentials: true,
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, OPTIONS, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Methods", "Content-Type", "Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("<h2>API is Running!</h2>");
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

app.get("/api/users", async (req, res) => {
  userModel
    .find()
    .then(function (users) {
      console.log("users: ", users);
      res.json(users);
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
});

app.post("/api/user", async (req, res)=> {
  try{
    const user = await userModel.create(req.body)
    res.status(200).json(user)
  } catch(error){
    console.log('error: ', error);
    res.status(500).json({message: error.message});
  }
});

app.put("/api/users/:id", async (req, res)=> {
  try{
    const {id} = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    console.log('user:123123 ', user);
    if(!user){
      return res.status(404).json({message: `cannot find record with Id: ${id}`});
    }

    res.status(200).json(user)
  } catch(error){
    console.log('error: ', error);
    res.status(500).json({message: error.message});
  }
});

app.delete("/api/users/:id", async (req, res)=> {
  try{
    const {id} = req.params;
    const user = await userModel.findByIdAndDelete(id, req.body)
    if(!user){
      return res.status(404).json({message: `cannot find record with Id: ${id}`});
    }

    res.status(200).json(user)
  } catch(error){
    console.log('error: ', error);
    res.status(500).json({message: error.message});
  }
});