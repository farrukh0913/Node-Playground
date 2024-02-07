const express = require("express");
const fs = require("fs");
const cors = require("cors");

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

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'Content-Type','Authorization');
  next();
})

app.get("/", (req, res) => {
  res.send("<h2>API is Running!</h2>");
});

// GET route - Allows to get all the items
app.get("/api/user", (req, res) => {
    res.status(200).json({ user: 'Waqar', id: 1 })
});

const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const mongodbConnectString = "mongodb+srv://admin:0OmQBJYlAKp8ACJy@cluster0913.aspusjs.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "Database0913";
var database;

app.listen(port, () => {
  MongoClient.connect(mongodbConnectString, (error, client)=> {
    database = client.db(databaseName);
    console.log(`MongoDB connected successfully!`);
  });

  console.log(`Server listening at http://localhost:${port}`);
});