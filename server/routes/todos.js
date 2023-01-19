// const Joi = require("joi");
const express = require("express"); //  imports the Express application object
const router = express.Router(); // uses it to get a Router object
// const jwt = require("jsonwebtoken");
const User = require("../models/registerModel");
const Todos = require("../models/todoModel");

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
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const userIdFromQuery = req.query.userId;
  const todoDoc = await Todos.findOne({ userId: userIdFromQuery });
  todoDoc.listItems = todoDoc.listItems.map((item) => {
    if (item._id.toString() === id) {
      item.completed = !item.completed;
    }
    return item;
  });
  todoDoc.save().then((savedDoc) => {
    res.json(savedDoc.listItems);
  });
});

// route to edit an item from the listItems array
router.put("/:id", async (req, res) => {
  const id = req.params.id; // convert id from object to number
  const userIdFromQuery = req.query.userId;
  const todoDoc = await Todos.findOne({ userId: userIdFromQuery });
  todoDoc.listItems = todoDoc.listItems.map((item) => {
    if (item._id.toString() === id) {
      item.title = req.body.title;
    }
    return item;
  });
  todoDoc.save().then((savedDoc) => {
    res.json(savedDoc.listItems);
  });
});

// route to delete item from the listItems array
router.delete("/:id", async (req, res) => {
  //take id from req params
  const id = req.params.id;
  //take the userId from req query params from deleteElement fct from front TodoList
  const userIdFromQuery = req.query.userId;
  //find the todo where userId is id from query
  const todoDoc = await Todos.findOne({ userId: userIdFromQuery });
  //filter listitems where item id is id and delete that item
  todoDoc.listItems = todoDoc.listItems.filter((item) => {
    return item._id.toString() !== id;
  });
  //save the new array of listitems and send to front
  todoDoc.save().then((savedDoc) => {
    res.json(savedDoc.listItems);
  });
});

//route to post/add items in database
router.post("/", async (req, res) => {
  const item = req.body;
  //destructuring listItems from req.body
  //changed the previous {id} from findOne to {userId: item.userId}
  const { listItems } = await Todos.findOne({ userId: item.userId })
    //execute findOne who return a promise
    .exec()
    //resolve the promise
    .then(async () => {
      //set listItems to Todos model findOne where userId is id, then push in listItem that is item from req.body
      let listItems = Todos.updateOne(
        //in updateOne, changed the userId from id to item.userId
        { userId: item.userId },
        { $push: { listItems: [item] } },
        { upsert: true } // add document with req.body._id if not exists
      ).then(() => {
        //then return the updated todos model with the given id
        //changed the userId from id to item.userId
        return Todos.findOne({ userId: item.userId });
      });
      //return listitems
      return listItems;
    });
  //we map through listItems and return from here a new array (newModifListItems) the id, which is the id from mongodb
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
//route to get the userId (from Todolist component) and set the listItems to the user
router.get("/", async (req, res, next) => {
  const userIdFromQuery = req.query.userId;
  const mongooseResponse = await Todos.findOne({ userId: userIdFromQuery });
  let listItems = [];
  if (mongooseResponse) {
    listItems = mongooseResponse.listItems;
  }
  res.status(201).json(listItems);
});

module.exports = router; //the module exports the Router object
