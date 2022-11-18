// const express = require('express'); //  imports the Express application object
// const jwt = require("jsonwebtoken");
// const router = express.Router(); // uses it to get a Router object
// const User = require('../models/registerModel');

// router.get('/', async (req, res, next) => {    
//     const cookies = req.headers.cookie;
//     console.log(cookies);
//     const token = cookies.split("=")[1];
//     console.log(token);
//     if(!token) {
//         res.status(404).json({message: "No token found!"});
//     }

//     jwt.verify(String(token),process.env.JWT_SECRET_KEY, (err,user) => {
//         console.log(user);
//         if(err) {
//             return res.status(400).json({message: "Invalid token", token})
//         }
//         console.log(user.id);
//         req.id = user.id;
//     })
//     next();
// });

// router.get('/', async (req, res, next) => {
//     const userId = req.id;
//     let user;
//     try{
//         user = await User.findById(userId, "-password");
//     } catch (err) {
//         return new Error(err)
//     }
//     if (!user) {
//         return res.status(404).json({message: "User not found"})
//     }
//     return res.status(200).json({user});
// })

// module.exports = router;