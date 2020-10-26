import Counter from "../Components/Counter";
import "../CSS/Card.css";

import React, { Component } from "react";
import axios from "axios";

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get(this.props.url)
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  Card = () => {
    this.Donate = (e) => {
      e.target.style.opacity = "0.5";
    };
    this.Normal = (e) => {
      e.target.style.opacity = "1";
    };
  };

  render() {
    return (
      <div className="card">
        <div className="image">
          <img
            onMouseOver={this.Donate}
            onMouseLeave={this.Normal}
            src={this.props.url}
            alt="error"
          />
          <button className="donate">DONATE</button>
        </div>

        <Counter className="vote" />
      </div>
    );
  }
}

export default Cards;
