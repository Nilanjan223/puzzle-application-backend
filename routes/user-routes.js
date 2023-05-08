const express = require("express");
const HttpError = require("../models/http-error");

const Users = require("../models/user");
const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  const uid = req.params.userId;
  //   console.log("CONTROLLER",uid);
  let user;
  try {
    user = await Users.findById(uid);
    // console.log('CONTROLLER ',user);
    if (!user) {
      const error = new HttpError("No user found");
      return next(error);
    }
  } catch (err) {
    return next(new HttpError("Could not fetch", 500));
  }
  // const user=User.find({},'email name');
  res.json({ stage: user.stage, hint: user.hint });
});

router.patch("/:userId", async (req, res, next) => {
  const uid = req.params.userId;

  const stage = req.body.stage;
  const hint=req.body.hint;

  let user;

  try {
    user = await Users.findById(uid);
  } catch (err) {
    const error = new HttpError("Somthing went wrong in fetching user");
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Somthing went wrong in fetching user");
    return next(error);
  }

//   console.log(user.stage);
  user.stage = stage;
  user.hint=hint;
//   console.log(user.stage);

  try {
    await user.save();
  } catch (err) {
    const error = "Couldnt save updated";
    return next(error);
  }
  res.json({ user: user });
});

module.exports = router;
