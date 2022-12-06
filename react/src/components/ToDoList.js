// import axios from "axios";
import List from "./List";
import ListHandler from "./ListHandler";
import Counter from "./Counter";
import history from "../components/History";
import { useEffect, useState } from "react";

const UP = -1; // variable used in moveUpDown function
const DOWN = 1; // variable used in moveUpDown function
const url = "http://localhost:1234/api/todos"; // variable for the url used in fetch

export default function ToDoList() {
  const [listItems, setListItems] = useState([]);
  const [loaded] = useState(true);
  const [input, setInput] = useState("");
  const [id, setId] = useState(Date.now());
  const [completed, setCompleted] = useState(false);
  const [editInput, setEditInput] = useState(false);

  useEffect(() => {
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then((res) => res.json())
      .then((listItems) => {
        setListItems(listItems);
        console.log(listItems);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          history.replace("/");
        }
      });
    //   axios.defaults.withCredentials = true;
    //   axios
    //     .get(url, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     })

    //     .then((res) => res.data)

    //     .then((listItems) => setListItems(listItems))
    //     .catch((err) => {
    //       console.log(err);
    //       if (err) {
    //         history.replace("/");
    //       }
    //     });
    // }, []
  }, []);

  // Function that modify the initial state for listItems: add a new element to listItems array which is the value added by the user to the input
  const addElementToList = () => {
    // axios
    //   .post(url, {
    //     withCredentials: true,
    //     data: {
    //       title: input,
    //       id: id,
    //       key: id,
    //       completed: completed,
    //       editInput: editInput,
    //     },
    //   })
    //   .then((res) => res.data)
    //   .then((listItems) => {
    //     if (listItems === "") {
    //       // TODO listItems should come as an array
    //       console.log(
    //         "setting list items to empty array if comes up empty string",
    //         listItems
    //       );
    //       listItems = [];
    //     } else {
    //       setListItems(listItems);
    //       console.log(listItems)
    //     }
    //     setListItems(listItems);
    //     setInput("");
    //     setId(id);
    //     setCompleted(false);
    //     setEditInput(false);
    //   })
    //   .catch((error) => console.error("Error " + error));

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        title: input,
        id: id,
        key: id,
        completed: completed,
        editInput: editInput,
      }),
    })
      .then((res) => res.json()) 
      .then((listItems) => {
        setListItems(listItems);
        setInput("");
        setId(id);
        setCompleted(false);
        setEditInput(false);
      })
      // })
      .catch((error) => console.error("Error " + error)); 
  };
  // function to delete an toDo (element) based on the element id
  const deleteElement = (id) => {
    fetch(url + "/" + id, {
      // to delete an item we need to send to server along with the url the id from the item that will be deleted
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((listItems) => {
        setListItems(listItems);
      })
      .catch((err) => {
        // handeling fetch promise errors
        console.error(err);
      });
  };
  // function to toggle if an todo is completed or not completed
  const toggleCompleted = (id) => {
    fetch(url + "/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // in POST request, variables below are sent in the body as key-value pairs
        id: id,
        completed: !completed,
      }),
    })
      .then((res) => res.json())
      .then((listItems) => {
        setListItems(listItems);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // function to change position of an todo element: we move the todo element up or down
  const moveUpDown = (id, direction) => {
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
    ) {
      return;
    }
    const item = listItems[position]; // save item for later
    const newItems = listItems.filter((i) => i.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item); // put the item on the new position
    setListItems(newItems);
  };
  // function to add an todo element with enter key from keyboard
  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      addElementToList();
    }
  };
  // Function that change the state of input object from initial state to value added into the input by the user
  const saveInput = (e) => {
    setInput(e.target.value);
  };

  let title = "ToDo List"; // Variable where we store the app title
  // After we call fakeRequest method in componentDidMount(), next, by using an if statement, we load the page
  if (loaded) {
    return (
      <div className="todo">
        <div className="todo-inner">
          <ListHandler
            title={title}
            input={input}
            saveInput={saveInput}
            addElement={addElementToList}
            completed={completed}
            editInput={editInput}
            handleKeyEnter={handleKeyEnter}
          />
          <List
            completed={completed}
            input={input}
            listItems={listItems}
            deleteElement={deleteElement}
            toggleCompleted={toggleCompleted}
            editInput={editInput}
            moveUpDown={moveUpDown}
            UP={UP}
            DOWN={DOWN}
            key={id}
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
