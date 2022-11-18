require('dotenv').config(); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
// I added this module because of the following error received when I want to start the server: Error: listen EADDRINUSE: address already in use :::1234
const express = require('express'); /*ExpressJS is a NodeJS module; express is the name of the module, and also the name we typically give to the variable we use to refer to its main function in code
                                      NodeJS provides the require function, whose job is to load modules and give you access to their exports*/
const mongoose = require('mongoose');
const app = express(); //app is an object returned by express()
const cors = require('cors'); /*CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
                              Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.*/
const cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.

                              const todos = require('./routes/todos'); /* todo's route - A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.
                                          To use the router module in our main app file we first require() the route module*/ 
const about = require('./routes/about'); // about page route
const register = require('./routes/register'); // register page route
const login = require('./routes/login'); // register page route
//const user = require('./routes/user'); // user authorization page route

const bodyParser = require('body-parser') //body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
const path = require('path');

app.use(cookieParser()); // tells the system that we want to use cookie parser
app.use(bodyParser.json()); // tells the system that we want json to be used.
app.use(cors({credentials: true, origin: "http://localhost:3000"})); // tells the system that we want cors to be used and we use credentials in it
app.use(express.static(__dirname));

app.use('/api/todos', todos); // after we call require() function, then we call use() on the Express application to add the Router to the middleware handling path, specifying a URL path
app.use('/api/about', about); // about route middleware
app.use('/api/register', register); // register route middleware
app.use('/api/login', login); // login route middleware

app.use(express.json({extended:false})); /*This option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
                                          The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. */

// TO DO: aici adaug middleware - 401 daca nu e autentificat resp nu e ok tokenul
//app.use('/api/user', user);

mongoose.connect(process.env.DATABASE_URI) // conect to mongodb
.then(() => console.log("Database connected..."))
.catch(err => console.log(err))

const PORT = process.env.PORT || 1234; // variable for the port for listenig server

app.get('/api', (req, res)=> { // route to app using the get() method
	res.send('hello world');
});

app.get("/*", function(req, res, next) {
  res.sendFile(path.join(__dirname, '../my-app-new/build', "index.html"));
  next()
});

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}!`)); // set the server port for listening
