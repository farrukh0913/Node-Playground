const express = require("express");
const cors = require("cors");
const multer = require("multer");
const userController = require('./controllers/userController'); // user controller (user endpoints)
require('./mongoConnection'); // MongoDB Connection

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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// added user controller (user endpoints)
app.use(userController);