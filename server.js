const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const userController = require('./controllers/userController');

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

app.use(userController);

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

// Swagger Start
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API with MongoDB',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${port}/`
      }
    ]
  },
  apis: ['/server.js']
}

// const swaggerSpecs = swaggerJSDoc(swaggerOptions);
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// Swagger End