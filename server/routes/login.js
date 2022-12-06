const express = require("express"); //  imports the Express application object
const router = express.Router(); // use it to get a Router object
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/registerModel");

// route for register page with post for username and password
router.post("/", async (req, res, next) => {
  try {
    const { username, password, userId } = req.body; // destructuring req.body object
    const user = await User.findOne({ username }).exec(); // check if username already exist and password is ok
    if (!user) {
      res.status(400); // if exist status 400 for the request
      res.json({
        message: "User not found. Signup Please!", //if exist send message in res body
      });
      return;
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password); // verify if hash password is correct
    if (!isPasswordCorrect) {
      res.status(400);
      res.json({
        message: "Invalid password!",
      });
      return;
    }
    const token = jwt.sign(
      //add token with user id
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.cookie("LoginToken", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 100000), //TO DO = reset cookies at couple of seconds
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    res.status(200);
    res.json({
      message: "Successfuly logged in!",
      user: {
        username: user.username,
        id: user._id,
      },
      token,
    });
  } catch (err) {
    res.json(err);
  }
  next();
});

module.exports = router;
