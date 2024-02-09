const { Router } = require('express');
const app = Router();
const userModel = require("../models/userModel");

app.get('/', (req, res) => {
    res.send("Home");
});

app.get("/", (req, res) => {
  res.send("<h2>API is Running</h2>").toString();
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

app.post("/api/user", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log("user:123123 ", user);
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

app.delete("/api/users/:id", async (req, res) => {
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