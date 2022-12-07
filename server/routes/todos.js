// const Joi = require("joi");
const express = require("express"); //  imports the Express application object
const router = express.Router(); // uses it to get a Router object
// const jwt = require("jsonwebtoken");
const User = require("../models/registerModel");
const Todos = require("../models/todoModel");

// route for get all items from the listItems array
// router.get('/', (req,res) => {
//  	res.status(200).json(listItems)
// });

// route for get one item from listItems array
router.get("/todo/:id", (req, res) => {
  const item = listItems.find((item) => item.id === parseInt(req.params.id));
  res.status(200).json(item);
});

// route for get titles from listItems array
router.get("/titles", (req, res) => {
  const titles = listItems.map((item) => item.title);
  res.status(200).json(titles);
});

// route to update completed
router.post("/:id", (req, res) => {
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
  res.status(200).json(listItems); // and set the new state for the array
});

// route to edit (put) an item from the listItems array
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert id from object to number
  const title = req.body.title; // save the title from frontend in a variable title
  listItems = listItems.map((item) => {
    // use the map function to iterate in the array to change the item
    if (item.id === id) {
      // if the item id is equal with the id from the request body
      item.title = title; // we change the item title with the title from the user input and
    }
    return item; // return the new item
  });
  res.status(201).json(listItems); // and send the new array to frontend
});

// route to delete item from the listItems array
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert id from object to number
  listItems = listItems.filter(
    // filter out the item from the array if
    (item) => item.id !== id // the item id is not the id received from params
  );
  res.status(201).send(listItems); // if the status is ok, send the new array to app
});

//route to post/add items in database
router.post("/", async (req, res) => {
  const item = req.body;
  //destructuring listItems from req.body
  const { listItems } = await Todos.findOne({ userId: item.userId })
    //execute findOne who return a promise
    .exec()
    //resolve the promise
    .then(async () => {
      //set listItems to Todos model findOne where userId is id, then push in listItem that is item from req.body
      let listItems = Todos.updateOne(
        { userId: item.userId },
        { $push: { listItems: [item] } },
        { upsert: true } // add document with req.body._id if not exists
      ).then(() => {
        //then return the updated todos model with the given id
        return Todos.findOne({ userId: item.userId });
      });
      //return listitems
      return listItems;
    });
  const newModifListItems = listItems.map((listitem) => {
    return {
      title: listitem.title,
      completed: listitem.completed,
      editInput: listitem.editInput,
      id: listitem._id.toString(),
    };
  });
  res.json(newModifListItems);
});

router.get("/", async (req, res, next) => {
  const { userIdFromQuery } = req.query.userId;
  const { listItems } = await Todos.findOne({ userId: userIdFromQuery });
  res.status(201).json(listItems);
});

module.exports = router; //the module exports the Router object
