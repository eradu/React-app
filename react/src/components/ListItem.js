import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // import Fontawesome for use them in app
// we need to import the icons separately in order to use them
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/CredentialContext";
import "../Styles/ListItem.scss"; // import scss file

const url = "http://localhost:1234/api/todos"; // variable for the url used in fetch
function ListItem(props) {
  const [editInput, setEditInput] = useState(false); // hook for set state and update state for editInput
  const [title, setUpdateTitle] = useState(props.title); // hook for set state and update state for the title
  const [, setListItems] = useState(props.listItems); // hook for listItems
  const { user } = useContext(UserContext);
  const saveEdit = (id) => {
    // function to edit an element based on the element id
    fetch(
      url +
        "/" +
        id +
        "?" +
        new URLSearchParams({
          userId: user.userId,
        }),
      {
        // fetch method provides an easy logical way to fetch resources asynchronously across the network and return a promise. Post request to add item/element to the array in the express server
        method: "PUT",
        credentials: "include",
        headers: {
          // for post is needed to provide the headers object whit the content type application json
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          // in PUT request, variables below are sent in the body as key-value pairs
          title: title,
        }),
      }
    )
      // fetch return a promise that is resolved with response (res) object; to extract the json body content from the response object, we use json() method
      .then((res) => res.json())
      // which return a second promise that resolves with the result of parsing the response body text as JSON
      .then((listItems) => {
        setListItems(listItems); // set the new state for listItems
        setUpdateTitle(title); // set the new state for title
        setEditInput(false); // reset the state for editInput
      })
      .catch((error) => console.error("Error " + error)); // here we handeling fetch Promise errors
  };

  const handleKeyEnterEdit = (event) => {
    // function to save edited item in array with "enter" key
    if (event.key === "Enter") {
      // if the keydown used by the user is Enter
      saveEdit(props.id); // we save the new value from the input
    }
  };
  return (
    // we use a ternary operator for the completed attr, to render the item with line strike if the item is completed
    <li className={props.completed ? "list-item strike" : "list-item"}>
      <span className="list-check">
        <input
          type="checkbox"
          checked={props.completed || false}
          // use onChange function to toggle the item completed or not completed
          onChange={() => {
            props.toggleCompleted(props.id);
          }}
        />
      </span>
      {/* we render the text added by the user whith titleprops that is coming from App component addElement function */}
      {editInput ? (
        <input
          className="edit-input"
          type="text"
          id={props._id}
          value={title}
          // we use onChange fction to set the new title with parameters e.target.value and the id from the props
          onChange={(e) => {
            setUpdateTitle(e.target.value, props.id);
          }}
          // save the title on enter keydown
          onKeyDown={handleKeyEnterEdit}
        />
      ) : (
        //use the onClick to change the state for editInput to true - the element from the list is transformed in input to let the user change the item form the
        <span
          className="item-title"
          onClick={() => {
            setEditInput(true);
          }}
        >
          {title}
        </span>
      )}
      <div className="right-btns">
        {/* we use ternary operator to render the item:
				if the item is completed we hide the edit icon, if not we show that icon */}
        {props.completed ? null : (
          <span className="update-btn">
            {/*with the button bellow, onClick we send the inormations from frontend (with fatch) to server */}
            <button
              onClick={() => {
                saveEdit(props.id);
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </span>
        )}
        <span>
          {/*button for delete function */}
          <button
            className="delete"
            onClick={() => {
              props.deleteElement(props.id);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
      </div>

      <div className="move-icons">
        <span className="up">
          {/*buttons to move up and down the items from listItems  */}
          <button
            onClick={() => {
              props.moveUpDown(props.id, props.UP);
            }}
          >
            <i className="fas fa-caret-up"></i>
          </button>
        </span>
        <span className="down">
          <button
            onClick={() => {
              props.moveUpDown(props.id, props.DOWN);
            }}
          >
            <i className="fas fa-caret-down"></i>
          </button>
        </span>
      </div>
    </li>
  );
}

export default ListItem;
