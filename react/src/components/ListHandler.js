
import "../Styles/ListHandler.scss";
import "../Styles/Mobile.scss";

const ListHandler = (props) => {
    return (
      <div className="listHandler">
        <h1>{props.title}</h1> 
        <div className="app-input">
          <div className="addToDo">
            <input className="add-input"
              type="text" 
              placeholder="Add ToDo Item"
              value={props.input} 
              onChange={props.saveInput}
              onKeyDown={props.handleKeyEnter}
              >
            </input>
            {/* we use ternary operator to show add button for new item or edit button in case that the user chose to edit an item */}
            <button className="add-btn"
              onClick={() => {props.addElement()}
            }>
              Add ToDo
            </button>
          </div>
        </div>
      </div>
    );
  }

export default ListHandler;