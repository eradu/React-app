import ListItem from "./ListItem";

import "../Styles/List.scss"; // import style sas for List component

const List = (props) => {
    return (
      <div className="list">
        <ul>
          {props.listItems.map((item, index) => {
            console.log(props.listItems);
            // in order to render a list of items we map the listItem array and use the ListItem component to render each item
            return (
              <ListItem
                key={index} // with key and value props we render the list from ListItem component
                title={item.title}
                // this props are comming from parent element App and are sent to the child element ListItem where we have the delete button
                id={item._id} // to delete a toDo we need the id of the toDo we want to delete and the delete function
                deleteElement={props.deleteElement}
                completed={item.completed} //to mark as complete a toDo we pass completed prop and toggle function from parent App component to List component and from here to child component ListItem where we have the checkbox
                toggleCompleted={props.toggleCompleted}
                editInput={item.editInput}
                //setUpdateInput={this.props.setUpdateInput}
                input={props.input}
                moveUpDown={props.moveUpDown}
                item={item}
                UP={props.UP}
                DOWN={props.DOWN}
              ></ListItem>
            );
          })}
        </ul>
      </div>
    );

}

export default List;
