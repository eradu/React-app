const express = require('express'); //  imports the Express application object
const router = express.Router(); // uses it to get a Router object

let learningItems = [
	{ title: "Class Components, Functional Components and diference between them;",
	id: 1},
	{
		title: "How to build a server with Express js;",
		id: 2
	},
	{
		title: "React Fetch: GET, POST, PUT and DELETE to get tasks from server, post a new tod task, update a task and delete a task;",
		id: 3
	},
	{
		title: "React Router - how to add router and routes to project;",
		id: 4
	}
]

// route for get all items from the listItems array
router.get('/', (req, res) => {
	res.status(200).json(learningItems)
	//console.log(learningItems);
});

module.exports = router;