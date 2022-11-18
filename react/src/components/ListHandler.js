import React, {Component} from "react";
import "../Styles/ListHandler.scss";
import "../Styles/Mobile.scss";

class ListHandler extends Component {

  render() {
    return (
      <div className="listHandler">
        <h1>{this.props.title}</h1> 
        <div className="app-input">
          <div className="addToDo">
            <input className="add-input"
              type="text" 
              placeholder="Add ToDo Item"
              value={this.props.input} 
              onChange={this.props.saveInput}
              onKeyDown={this.props.handleKeyEnter}
              >
            </input>
            {/* we use ternary operator to show add button for new item or edit button in case that the user chose to edit an item */}
            <button className="add-btn"
              onClick={() => {this.props.addElement();}
            }>
              Add ToDo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListHandler;