import React from "react";
import Counter from "../Components/Counter";
import "../CSS/Card.css";

function Card() {
  const Donate = (e) => {
    e.target.style.opacity = "0.5";
  };
  const Normal = (e) => {
    e.target.style.opacity = "1";
  };
  return (
    <div className="card">
      <div className="image">
        <img
          onMouseOver={Donate}
          onMouseLeave={Normal}
          src="https://i.redd.it/ppb0nrobmev51.jpg"
        />
        <button className="donate">DONATE</button>
      </div>

      <Counter className="vote" />
    </div>
  );
}

export default Card;
