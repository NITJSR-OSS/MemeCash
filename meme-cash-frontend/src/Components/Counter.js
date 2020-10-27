import React, { Component } from "react";
import "../CSS/Counter.css";

class Counter extends Component {
  constructor(props) {
    super();

    this.state = {
      count: 0,
    };
  }

  Increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  Decrement() {
    this.setState({
      count: this.state.count - 1,
    });
  }

  render() {
    return (
      <div className="counter">
        <div className="btn-vote">
          <div className="upvote">
            <h4 onClick={() => this.Increment()}>&uarr;</h4>
          </div>
          <div className="downvote">
            <h4 onClick={() => this.Decrement()}>&darr;</h4>
          </div>
        </div>
        <div>
          <p>{this.state.count}</p>{" "}
        </div>
      </div>
    );
  }
}

export default Counter;
