const Joi = require('joi');
const express = require('express'); //  imports the Express application object
const router = express.Router(); // uses it to get a Router object
const jwt = require("jsonwebtoken");
const User = require('../models/registerModel');
const Todos = require('../models/todoModel');

// let listItems = [{
// 	title: "something",
// 	id: 1,
// 	completed: true,
// 	editInput: false
// },
// {
// 	title: "something2",
// 	id: 2,
// 	completed: true,
// 	editInput: false
// },
// {
// 	title: "something3",
// 	id: 3,
// 	completed: false,
// 	editInput: false
// }]
let listItems =[];

// route for get all items from the listItems array
// router.get('/', (req,res) => {
//  	res.status(200).json(listItems)
// 	//console.log(listItems)
// });

// route for get one item from listItems array
router.get('/todo/:id', (req,res) => {
	const item = listItems.find(item => item.id === parseInt(req.params.id));
	//console.log('item is ', item);
	res.status(200).json(item)
});

// route for get titles from listItems array
router.get('/titles', (req,res) => {
	const titles = listItems.map(item => item.title);
	//console.log('titles are ',titles);
	res.status(200).json(titles)
});

// route to post items in the listItems array
// router.post('/', (req,res) => {
//   const schema = Joi.object({
//     title: Joi.string().min(3).required(), 
//     id: Joi.number().min(1),
// 	key: Joi.number().min(1),
// 	completed: Joi.boolean(),
// 	editInput: Joi.boolean()
//   });
//   const {error, value} = schema.validate(req.body,
// 		{abortEarly: false});
//   if(error) {
// 	console.log(error);
//     return res.status(400).send(error.details[0].message);
    
//   }
//   	const newInput = { // create a new item
// 		id: Date.now(),
// 		title: req.body.title,
// 		key: req.body.id,
// 		completed: false,
// 		editInput: false
//     }
//     listItems.push(newInput); // add (push) the new item in the array
//     res.status(201).json(listItems);
// 	console.log("9: ", listItems);
//  });

// route to update completed
router.post('/:id', (req,res) => {
	const id = parseInt(req.params.id);
	// function to mark element (toDo) as done with a checkbox based on the element id
	listItems = listItems.map((item) => {
		//we map through the array and based to the id of element
			if (item.id === id) {
				// if the id of the element marked is equal with the id,
				item.completed = !item.completed; //we toggle the state for completet from false to true
			}
			return item;
			});
	// and set the new state for the array
	res.status(200).json(listItems);
}); 

// route to edit (put) an item from the listItems array
router.put('/:id', (req,res) => {
	const id = parseInt(req.params.id); // convert id from object to number
	const title = req.body.title // save the title from frontend in a variable title
	// console.log(title);
	listItems = listItems.map(item => { // use the map function to iterate in the array to change the item
		if(item.id === id){ // if the item id is equal with the id from the request body
		item.title = title; // we change the item title with the title from the user input and  
		}
   		 return item; // return the new item 
  	})
  	res.status(201).json(listItems);  // and send the new array to frontend

});

// route to delete item from the listItems array 
router.delete('/:id', (req,res) => {
  	const id = parseInt(req.params.id); // convert id from object to number
    	listItems = listItems.filter( // filter out the item from the array if 
      	item => item.id !== id // the item id is not the id received from params
    );
    res.status(201).send(listItems) // if the status is ok, send the new array to app
});

//route to post/add items in database
router.post('/', async (req,res) => {
	console.log("todos");
	const { username } = req.body; // destructuring req.body object
        const user = await User.findOne({ username }).exec(); // check if username already exist and password is ok
		console.log("user is: ", user);
        if(!user) {
            res.status(400); // if exist status 401 for the request
            res.json({
                message: "User not found. Signup Please!" //if exist send message in res body
            });
            return;
        }
	const item = req.body;
	console.log("1 Item is: ", item);
	const listItems = await Todos.findOne({userId: user._id}).exec();
	console.log("2 listItems is: ", listItems);
	if(!listItems) {
		await Todos.create({
			userId:user._id,
			listItems: item,
		});
		console.log("3 now listItems is: ", listItems);
	} else {
		await Todos.updateOne({userId: user._id}, {$push: {listItems: item}})
		await listItems.save()
		console.log("4 listItems from else is: ", listItems.listItems);
	}
	res.json(listItems.listItems);
});

// router.get('/', async (req,res) => {
// 	const { authorization } = req.headers; // destructuring req.header object
// 	const [token] = authorization.split();
// 	const [username, password] = token.split(" : ");

// 	const user = await User.findOne({ username }).exec(); // check if username already exist and the password is ok for that user
// 	if(!user || user.password !== password) {		
// 		res.status(403); // if exist status 403 for the request
// 		res.json({
// 			message: "Invalid access!" //if exist send message in res body
// 		});
// 		return;
// 	}
// 	const {listItems} = await Todos.findOne({userId: user._id}).exec();
// 	res.json(listItems);
// });

// router.get('/', async (req, res, next) => {    
//     const cookies = req.cookies;
//     console.log("Cookies: ",cookies);
//     const token = cookies.LoginToken;
//     console.log("token is ",token);
//     if(!token) {
//         res.status(404).json({message: "No token found!"});
//     }

//     jwt.verify(String(token),process.env.JWT_SECRET_KEY, (err,user) => {
//         //console.log(user);
//         if(err) {
//             return res.status(400).json({message: "Invalid token", token})
//         }
//         //console.log(user.id);
//         req.id = user.id;
//     })
//     next();
// });

router.get('/', async (req, res, next) => {
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId, "-password");
    } catch (err) {
        return new Error(err)
    }
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({user});
})


module.exports = router; //the module exports the Router object


// const item = req.body;
// const listItems = await Todos.findOne({userId: user._id}).exec();
// console.log(listItems);
// if(!listItems) {
// 	await Todos.create({
// 		userId: userId._id,
// 		listItems: item
// 	});
// } else {
// 	await Todos.updateOne({userId: user._id}, {$push: {listItems: item}});
// 	await listItems.save();
// }
// return res.status(200).json(listItems.listItems);
// next();