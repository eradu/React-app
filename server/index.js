require("dotenv").config(); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// I added this module because of the following error received when I want to start the server: Error: listen EADDRINUSE: address already in use :::1234
const express = require("express"); /*ExpressJS is a NodeJS module; express is the name of the module, and also the name we typically give to the variable we use to refer to its main function in code
                                      NodeJS provides the require function, whose job is to load modules and give you access to their exports*/
const mongoose = require("mongoose");
const app = express(); //app is an object returned by express()
const cors = require("cors"); /*CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
                              Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.*/
const cookieParser = require("cookie-parser"); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.

const todos = require("./routes/todos"); /* todo's route - A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.
                                          To use the router module in our main app file we first require() the route module*/
const about = require("./routes/about"); // about page route
const register = require("./routes/register"); // register page route
const login = require("./routes/login"); // register page route
const User = require("./models/registerModel");
const bodyParser = require("body-parser"); //body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const path = require("path");
const jwt = require("jsonwebtoken");
app.use(cookieParser()); // tells the system that we want to use cookie parser
app.use(bodyParser.json()); // tells the system that we want json to be used.
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // tells the system that we want cors to be used and we use credentials in it
// app.use(express.static(__dirname));

mongoose
  .connect(process.env.DATABASE_URI) // conect to mongodb
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.use("/api/about", about); // about route middleware
app.use("/api/register", register); // register route middleware
app.use("/api/login", login); // login route middleware

// middleware to verify token in /todos route; all routes that are above this middleware are not verified
const verifyToken = function (req, res, next) {
  const cookies = req.cookies;
  const token = cookies.LoginToken;
  if (!token) {
    res.status(404).json({ message: "No token found!" });
    return;
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalid token" });
      return;
    } else {
      req.id = user.id;
      next();
    }
  });
};
//call for get user: we verify the token -> if we have token, we have user and send the user to frontend
app.get("/api/user", async (req, res, next) => {
  const cookies = req.cookies;
  const token = cookies.LoginToken;
  if (!token) {
    res.status(404).json({ message: "No token found!" });
    return;
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalid token" });
      return;
    } else {
      const username = await User.findOne({ _id: user.id });
      res.status(200).json({
        user: {
          username: username.username,
          userId: user.id,
        },
      });
      next();
    }
  });
});

app.get("/api/json-complex", (req, res) => {
  res.json(
    [
      {
        arr: [
          "og.botresp",
          "FDLwQcM2hb6HQZ4waVJFktjwKS57Win8nb6ZQQxv5FwBHqh/W5HyRhEg0sRqbfHv0/Ive3ghPzdSIgWV1z7JQh9Fdp3Wk8q5Ucr+q6Z+p1m+LEylqiRApSxJeY9G36vaJwPzxEzfmJEvD8uCJlCcsJGQMbO1hO+tW4Vd347x34cEMsyApJP+XgYy3GGeYHSfKejAI55oxt5Y6Y7LWPvL7bqA1lRFlxIqBP5rNxAAsEwz+fB7Je2EL18ROEakrBsdXzvuGPhI2We7uTv38oBoT9Pq71Z5Q9TX4up0zxRvsgnMzWTGRzReFVetDjUZhZ/74bMEq4aR4mhqmsLCuUQ6pPxsktwscgzYCg8zBOXCx3RsQRbbaFfAbbXVQOBAyfgTpFUxNST3WjbLN6AXTE2d/XoCymhNqTnsaAhVIZS1GbcLNKk63ZHm9K1P+XjrPb2rH8XZ42bxB81wvHR4Nl0EocT0dWhWpCyTlopq2GPkgcri36tvrDS8P8nrZAdRpk0spCOW9iXT2tiQlAEiEVlg0zWwvR7FCIdC98QsHJQ7lVwMc+zyDP7243T2Zt+g2G9kpVb1HmPnLO3L4TUkpIATAXCp8gtvrBzNfKfNfdY1f2tESMwuDb20QJJGuBNGXwvuxyMqw2/+WFalFtTZkJNNGoUiNI1AvLF58P2XMN8O4qAXmVbwhHklHCBI/0xzVWrpKszU0ZZSRCHT35sk4uOzBhpTvmuMd4sJSHFVNlkJ93TL4i0nVEMn2rXEAYsk5S2cX4tAKHHqNVAfssgHNHu4vdpvSsFCzSoBeUIlYW/CcHBCh6JZgwe1kATNLcYy9oZnZXyY9waBjpD9vDOWZAyNnPeXZA4QjeLoQzyLjVYX//ggW0wzLcO5A",
          "//www.google.com/js/bg/api979c0EJY6QQNrS8TSWwgKrshdt-vRMqEtOqF-hYY.js",
          "api979c0EJY6QQNrS8TSWwgKrshdt-vRMqEtOqF-hYY",
        ],
        di: 24,
        e: 3.19574,
      },
      [
        "-1",
        {
          ANDROID_BACKUP: 0,
          BATTERY_STATS: 0,
          SMART_SETUP: 0,
          TRON: 0,
        },
        { 175237375: 10000 },
      ],
    ]
  );
});

app.use("/api/todos", verifyToken, todos); // after we call require() function, then we call use() on the Express application to add the Router to the middleware handling path, specifying a URL path

app.use(
  express.json({ extended: false })
); /*This option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. */

const PORT = process.env.PORT || 1234; // variable for the port for listenig server

app.get("/api", (req, res) => {
  // route to app using the get() method
  res.send("hello world");
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`)); // set the server port for listening
