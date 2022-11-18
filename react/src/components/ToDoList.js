import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import ListHandler from "./ListHandler";
import Counter from "./Counter";

//import { CredentialsContext }from './CredentialContext';

// We can define and use a constant variable when we use class component only outside of the component!!!
// const fakeResponse = ['Facebook', 'Insta', 'Boti']; // fakeResponse is an object that contain our fake data that we want to load
const UP = -1; // variable used in moveUpDown function
const DOWN = 1; // variable used in moveUpDown function
const url = "http://localhost:1234/api/todos"; // variable for the url used in fetch

class ToDoList extends Component {

	//static contextType = CredentialsContext;

	/* App is a Component defined as Class component - to define a class component we need to extend React.Component*/
	constructor(props) {
    /* The React constructor() is a method that is automatically called during the creation of an object from a class; Constructor is the only place to assign "this.state" directly
                    It is called before the render() method; Constructors are used for two objectives: 
                    1. to initialize the local state of the component by assigning an object to this.state; 
                    2. to bind event handlers that occur in the component*/

    super(props); /* Super is a method of constructor who accepts 'props' as argument -  We need super to set property or use 'this' inside the constructor
                It is mandatory to call super(props) method before any other statement in the constructor - else "this.props" will be undifined in constructor and can create bugs
                "props" = properties - it is an objects which store the value of attributes of a tag and work similar to the HTML attributes
                "props" pass data from one (parent) component to other (child) components and are imumtable = we cannot modify the props inside a component*/

    this.state = {
		/* State is used to store the data of the components that have to be rendered to the view;  the state object can store multiple properties and can change over time
					"this.state" it's an object and is used to asign the initial state in the constructor
					never change the state in "this.state": changes are made with "setState()", outside of the constructer*/

		//listItems: ["facebook", "app", "insta", "something"], //Initial states for listItems array, input and load

		listItems: [], // initialize listItem to an empty array
		// learningItems: [], // initialize listItem to an empty array
		loaded: true, // Loaded is a property added in the state object after we make fakeResponse() method, where we setState() as true for "loaded". It's added after we create the "loaded: true" in setState()
		input: "", // input is the state for the input that we need to acces the value added by the user and add that value to the listItems array; initial state is empty string
		id: Date.now(), // id attribute specifies a unique id for the input element and is set with the method Date.now() which return a unique number for the moment in time when the input is created
		completed: false, // boolean used to show a item as complete or not using the checkbox
		editInput: false, // boolean used to edit an item
    };
	
    // Bindig "this" when we need a class method to be passed in props to children
    this.addElementToList = this.addElementToList.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    //this.setUpdateInput = this.setUpdateInput.bind(this);
    this.moveUpDown = this.moveUpDown.bind(this);

    // this.saveInput = this.saveInput.bind(this); // If the methode is initialized with an Arrow Function  (ex: saveInput), is not needed to be bind; In this case the scope of "this" is global and not limited to any calling function.
  }
  
  componentDidMount() {
    /* componentDidMount() is a method invoked immediately after a component is mounted - inserted into the tree (of components);
                    Any initialization that required DOM nodes should go here;
                    Here is the place to instantiate network requests;*/
    // code below was commented to save time
    //this.fakeRequest(); // We call this method here because we want first to render something to the screen so the user is aware that the loading is taking place;
	//const credentials = this.context;
	//console.log(credentials);
    // fetch(url) //GET request using fetch to add all items from express server
	// 	.then((res) => res.json())
	// 	.then((listItems) => this.setState({ listItems: listItems }, console.log(listItems)));
	axios.defaults.withCredentials = true;
	const sendRequest = async () => {
		const res = await axios.get(url, {
			withCredentials: true
		}).catch(err => console.log(err));
		console.log(res)
		const data = await res.data;
		console.log(data)
		return data
	}
	
	sendRequest().then((data) => {})
	
// 	fetch(url, {
// 		method: "GET",
// 		headers: {
// 			// for post is needed to provide the headers object whit the content type application json
// 			"Content-Type": "application/json",
// 			Authorization: `${this.context[0].username} : ${this.context[0].password}`
//       	}
// 	})
// 	.then(res => res.json())
// 	.then(listItems => {this.setState({ listItems: listItems }); console.log(listItems)});
		
   }
  // code below was commented to save time
  /* We create fakeResponse as an array in order to setState() for listItems;
 In the fakeRequest method we are changing the state of "loaded" to true also;
 Then we call the fakeRequest method in the "componentDidMount()" lifecycle method*/
  /* fakeRequest = () => { 
    this.timerID = setTimeout(() => { // we use setTimeout method in order to setState() after 2.5seconds; 
      this.setState({
        listItems: this.state.listItems,        
        listItems: fakeResponse, // We set listItems array as fakeRespons array         
        loaded: true, // we add a property "loaded" as true
        });
      }, 2500);
    };*/

  componentDidUpdate() {
    /* componentDidUpdate() is a method invoked immediately after updatings happend; this method is not called for the initial render;
                      An update can be caused by changes to props or state. We can use this method to operate on the DOM when the component has been updated;
                      Here is a good place to do network requests, as long we compare the current props to previous props;*/
    // console.log ( 'I updated:' + [...this.state.listItems ]);
	
  };

  componentWillUnmount() {
    // componentWillUnmount() is invoked immediately before a component is unmounted and destroyed; In this method we perform any necessary cleanup: invalidating timers, canceling network requests that were created in componentDidMount()
    // clearInterval(this.timerID);  // we clearInterval that was set in Counter component with setInterval; we need to unmount the count function when the Counter component was unmount, else the count function will continuu to be executed
  }
  

  addElementToList() {
    // Function that modify the initial state for listItems: add a new element to listItems array which is the value added by the user to the input
	//const {username, password} = this.context;
	fetch(url, {
      // fetch method provides an easy logical way to fetch resources asynchronously across the network and return a promise. Post request to add item/element to the array in the express server
		method: "POST",
		headers: {
			// for post is needed to provide the headers object whit the content type application json
			"Content-Type": "application/json",
			Authorization: `${this.context[0].username} : ${this.context[0].password}` // use username and password from context 
      	},
      	body: JSON.stringify({
			// in POST request, variables below are sent in the body as key-value pairs
			title: this.state.input,
			id: this.state.id,
			key: this.state.id,
			completed: this.state.completed,
			editInput: this.state.editInput
      	}),
    })
		.then((res) => res.json()) // fetch return a propmise that is resoved with response (res) object; to extract the json body content from the response object, we use json() method
		.then((listItems) => {
			// which return a second promise that resolves with the result of parsing the response body text as JSON
			this.setState({
			// with "this.setState" we change the state for the app: we set the state for listitems array, updateing it with the value added in the input by the user
			listItems: listItems   , //  adding the new todo item in the array
			input: "", // reset the input to empty string: we clear the value of the input after the user click on add button
			id: Date.now(), // set new id
			completed: false, // set completed attribute to false
			editInput: false // set editInpute attribute to false
			});
			console.log(typeof listItems);
		})
      	.catch((error) => console.error("Error " + error)); // here we handeling fetch Promise errors
		// code below was replaced with the fetch method becoause we implement the express server
		// const newInput = {
		//   id: Date.now(),
		//   title: this.state.input,
		//   key: this.state.id,
		//   completed: false,
		//   editInput: false
		// }
		// const newListItems = [...this.state.listItems, newInput];
		//   this.setState({
		//   listItems: newListItems,
		//   input: '',
		//   id: Date.now(),
		//   editInput: false,
		//   completed: false,
		//   key: this.id
		//  })
		
  	}

  deleteElement(id) {
    // function to delete an toDo (element) based on the element id
    fetch(url + "/" + id, {
		// to delete an item we need to send to server along with the url the id from the item that will be deleted
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
    })
	.then((res) => res.json())
	.then((listItems) => {
        // console.log(listItems);
        this.setState({
          // we change the status for the array - without the element that was deleted
          listItems: listItems
        });
      })
      .catch((err) => {
        console.error(err);
      }); // handeling fetch promise errors
    // code below was replaced with the fetch method becoause we implement the express server
    /* const filteredListItems = this.state.listItems.filter( // we filter out the element from array based on the id
    (item) => item.id !== id);
    this.setState({ //   listItems: filteredListItems
    });*/
  	}

  	toggleCompleted(id) {
		fetch(url + "/" + id, {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify({
			// in POST request, variables below are sent in the body as key-value pairs
			id: this.state.id,
			completed: !this.state.completed
      	}),
		})
		.then((res) => res.json())
		.then((listItems) => {
			// console.log(listItems);
			this.setState({
			  // we change the status for the array - without the element that was deleted
			  listItems: listItems
			});
		  })
		  .catch((err) => {
			console.error(err);
		  });
	}

	moveUpDown = (id, direction) => {
		// function used to move up or down an toDo item in the list, based on id and direction param
		const { listItems } = this.state; // object destructering - assign this.state.listItems to the cons variable listItems
		// Remove item from the array
		const position = listItems.findIndex((i) => i.id === id); // defining the position of the item
			if (position < 0) {
				// validation: if the item does not exist - throw error message
				throw new Error("Item not found");
			} else if (
				// validation: canot move outside of array
				(direction === UP && position === 0) || // if the item is the first item - can't move up
				(direction === DOWN && position === listItems.lenght - 1) // if the item is the last item - can't move down
			) {return;}
			const item = listItems[position]; // save item for later
			const newItems = listItems.filter((i) => i.id !== id); // remove item from array
			newItems.splice(position + direction, 0, item); // put the item on the new position
			this.setState({ listItems: newItems }); // set the new state for the listItem array
  	};

	handleKeyEnter = (event) => {
		// function to add an new item in array with "enter" key
		if (event.key === "Enter") {
			this.addElementToList();
		}
	};

	saveInput = (e) => {
		// Function that change the state of input object from initial state to value added into the input by the user
		this.setState({
			input: e.target.value
		});
	};

  	render() {
		// let ctx = this.context;
		// console.log(ctx);

    /* render() is the only required method in a class component and returns a description of what a component should display on the screen
            - it returns a markup structure for using the "JSX" syntax; JSX is a combination of HTML and Javascript.
            render() method should not modify component state;
            When is called, should examine this.props and this.state and return react elements, arrays and fragments, portals, string and numbers, booleans or null.*/
    let title = "ToDo List"; // Variable where we store the app title

    if (this.state.loaded) {
      // After we call fakeRequest method in componentDidMount(), next, by using an if statement, we load the page
      return (
        /* return statement returns the date, the response, or the JSX elements;
             If is used in render() method it need to return an react element, strings and numbers, portals or booleans*/
        // this is the div with class App that will be rendered
        <div className="todo">
			<div className="todo-inner">
				{/* ListHandler is the component where we save the input value changed/added by the user and than add that value to listItems array 
				with the help of a button; the result is a new item in the list;
				- with input props we send the state of that input to the ListHandler component;
				- we pass saveInput function as saveInput function to ListHandler component, where with onChange event handler we save the value of the input;
				- we pass addElement function as addElementToList to ListHandler component, where with onClick event handler we add the value of the input 
				into the new array listItems  */}
				<ListHandler
				title={title}
				input={this.state.input}
				saveInput={this.saveInput}
				addElement={this.addElementToList}
				completed={this.state.completed}
				editInput={this.state.editInput}
				handleKeyEnter={this.handleKeyEnter}
				/>
				{/*List is the component which render a list of items; list of items are stored in the listItems array; 
			using the state we pass the listItems to List component*/}
				<List
				completed={this.state.completed}
				input={this.state.input}
				listItems={this.state.listItems}
				deleteElement={this.deleteElement}
				toggleCompleted={this.toggleCompleted}
				editInput={this.state.editInput}
				moveUpDown={this.moveUpDown}
				UP={UP}
				DOWN={DOWN}
				key={this.state.key}
				/>
			</div>
        </div>
      	);
    } else {
      /* Otherwize, if the page has not yet loaded we are going to render our new Counter component;
     Counter component count each second, starting from 0 and render for the user a message right away, so that user is aware that the loading of the aplication is taking place;
     After the loading is complete the user will have the list of elements*/
      return <Counter />;
    }
  }
}

export default ToDoList;
