// import axios from "axios";
import List from "./List";
import ListHandler from "./ListHandler";
import Counter from "./Counter";
import history from "../components/History";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/CredentialContext";

const UP = -1; // variable used in moveUpDown function
const DOWN = 1; // variable used in moveUpDown function
const url = "http://localhost:1234/api/todos"; // variable for the url used in fetch

export default function ToDoList() {
  const [listItems, setListItems] = useState([]);
  const [loaded] = useState(true);
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editInput, setEditInput] = useState(false);
  // added usercontext
  const { user } = useContext(UserContext);

  useEffect(() => {
    //check if user exist; if exist, we get listItems based on the userId using a querry in url with params
    if (user) {
      fetch(
        url +
          "?" +
          new URLSearchParams({
            userId: user.userId,
          }),
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      )
        .then((res) => res.json())
        .then((listItems) => {
          console.log(listItems);
          setListItems(listItems);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            history.replace("/");
          }
        });
    }
  }, [user]);

  // Function that modify the initial state for listItems: add a new element to listItems array which is the value added by the user to the input
  const addElementToList = () => {
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        //added in body the userId as user.userId from context, and deleted the id and the key (key is set in List.js as the index)
        userId: user.userId,
        title: input,
        completed: completed,
        editInput: editInput,
      }),
    })
      .then((res) => res.json())
      .then((listItems) => {
        setListItems(listItems);
        setInput("");
        setCompleted(false);
        setEditInput(false);
      })
      // })
      .catch((error) => console.error("Error " + error));
  };
  // function to delete an toDo (element) based on the element id
  const deleteElement = (id) => {
    fetch(
      url +
        "/" +
        id +
        "?" +
        new URLSearchParams({
          userId: user.userId,
        }),
      {
        // to delete an item we need to send to server along with the url the id from the item that will be deleted
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
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
    fetch(
      url +
        "/" +
        id +
        "?" +
        new URLSearchParams({
          userId: user.userId,
        }),
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
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
    // defining the position of the item
    const position = listItems.findIndex((i) => i._id === id);
    // validation: if the item does not exist - throw error message
    if (position < 0) {
      throw new Error("Item not found");
    } else if (
      // validation: cannot move outside of array
      (direction === UP && position === 0) || // if the item is the first item - can't move up
      (direction === DOWN && position === listItems.lenght - 1) // if the item is the last item - can't move down
    ) {
      return;
    }
    //set pozition of element
    //let aux = listItems[position];
    //if want to move element UP

    if (direction === UP) {
      //set the element pozition at new pozition up one level
      //listItems[position] = listItems[position - 1];
      const newListItems = [...listItems];
      [newListItems[position], newListItems[position - 1]] = [
        newListItems[position - 1],
        newListItems[position],
      ];
      setListItems([...newListItems]);
      //set new pozition as aux pozition
      //listItems[position - 1] = aux;
    } else {
      const newListItems = [...listItems];
      //same for DOWN direction
      // listItems[position] = listItems[position + 1];
      // listItems[position + 1] = aux;
      [newListItems[position], newListItems[position + 1]] = [
        newListItems[position + 1],
        newListItems[position],
      ];
      setListItems([...newListItems]);
    }
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
            // key={id}
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
