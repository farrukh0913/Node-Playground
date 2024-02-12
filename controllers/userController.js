const { Router } = require('express');
const userModel = require("../models/userModel");
const app = Router();
const port = 3000;

  /* Swagger Start */
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerFile = true ? YAML.load('./swagger.yml') : require('./swagger.json');
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  /* Swagger End */

app.get("/", (req, res) => {
  res.send("<h2>API is Running</h2>").toString();
});

app.get("/users", async (req, res) => {
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

app.post("/user", async (req, res) => {
  try {

    const user = await userModel.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find record with Id: ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find record with Id: ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;