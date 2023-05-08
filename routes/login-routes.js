const { v4: uuid } = require("uuid");
const express = require("express");
const HttpError = require("../models/http-error");
const { check, validationResult } = require("express-validator");

const Users = require("../models/user");

const router = express.Router();


router.post(
  "/",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const e = new HttpError("INVALID INPUTS");
      return next(e);
    }

    const { email, password } = req.body;

    // const userData = {
    //   id: uuid(),
    //   email,
    //   password,
    //   stage: 1,
    //   time: {},
    // };

    const newUser = new Users({
      email,
      password,
      stage: 1,
      hint:0,
      time: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
      },
    });
    // const adminEmail="admin@test.com";
    // const findUser = DUMMY.find((u) => u.email === email);
    const findUser = await Users.findOne({ email: email });
    if (!findUser) {
      //   DUMMY.push(userData);
      try {
        await newUser.save();
      } catch (err) {
        const error = new HttpError("Could not save");
        return next(error);
      }
    } else if (findUser.password !== password) {
      const error = new HttpError("WRONG PASSWORD");
      return next(error);
    }

    res.json({ message: "DATABASE CREATED. NOW LOGIN..!!", USERS: findUser });
  }
);

module.exports = router;
