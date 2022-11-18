import React, {Component} from "react";
import "../Styles/Counter.scss"

class Counter extends Component {
  //Add the class constructor
  constructor(props) {
    super(props);
    //Setting the initial state
    this.state = {
      seconds: 0
    }  
  }

  increment = () => {
    this.setState(prevState => ({
      seconds: prevState.seconds +1
    }))
  }

  count = () => {
    this.timerID = setInterval(
      () => this.increment(), 1000
    )
  }

  //Lifecycle methods that gets executed after render(at mounting)
  componentDidMount() {
    this.count();
  }

  render() {
    return (
      <div className="counter-message">
        <div>
          <h5> \Loading...</h5>
          <h5>Your request is being processed! Time passed: {this.state.seconds}</h5>
        </div>
      </div>
    )
  }
}

export default Counter;