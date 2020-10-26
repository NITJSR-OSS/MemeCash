import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import "../CSS/Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="memes">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Home;
