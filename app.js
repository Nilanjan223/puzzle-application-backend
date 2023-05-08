const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin-routes");
const loginRoutes = require("./routes/login-routes");
const userRoutes=require("./routes/user-routes")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/admin", adminRoutes);

app.use("/api/login", loginRoutes);

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find route");
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://nvyas:yGutf41nCemDDzoy@cluster0.akj0uua.mongodb.net/elitmus?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// pass-yGutf41nCemDDzoy
