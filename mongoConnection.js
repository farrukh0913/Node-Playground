const { Router } = require('express');
const app = Router();
const mongoose = require("mongoose");

const mongoConnectionString =
  "mongodb+srv://admin:0OmQBJYlAKp8ACJy@cluster0913.aspusjs.mongodb.net/?retryWrites=true&w=majority";
const mongoDBName = "Database0913";

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: false,
  dbName: mongoDBName,
});

const mongoConnection = mongoose.connection;
mongoConnection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});