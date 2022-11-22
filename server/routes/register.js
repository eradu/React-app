const express = require('express'); //  imports the Express application object
const router = express.Router(); // use it to get a Router object
// const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('../models/registerModel');

const bcrypt = require("bcryptjs");

// route for register page with post for username and password
router.post('/', async (req,res) => {
    try{
        const { username, password } = req.body; // destructuring req.body object
        const user = await User.findOne({ username }).exec(); // check if username already exist
        if(user) {
            res.status(400); // if exist status 400 for the request
            res.json({
                message: "User already exists!" //if exist send message in res body
            });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password);
        const newUser = new User({ //add new user with username and password
            username,
            password: hashedPassword
        });
        const saveUser = await newUser.save() //save the user in db
        return res.status(200).json({message: saveUser})
    } catch(err) {
        res.json(err);
    }
});

module.exports = router;
