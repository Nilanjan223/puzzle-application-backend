const express = require("express");
const HttpError=require("../models/http-error");

const Users=require('../models/user');
const router = express.Router();

router.get("/", async(req, res, next) => {

  let users;
  try {
    users = await Users.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Could not fetch", 500));
  }
  // const user=User.find({},'email name');
  res.json({ users: users.map((u) => u.toObject({ getters: true })) });

  // console.log("GET req");
  // const data = DUMMY.forEach((u) => {return u});
  // console.log(data);
  // res.json({
  //   data: DUMMY,
  // });

});

module.exports = router;
