import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import "../CSS/Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="memes">
        <Card url={"https://i.redd.it/twzbpwjfbgv51.jpg"} />
        <Card url={"https://i.redd.it/khx0mwatpfv51.jpg"} />
        <Card url={"https://i.redd.it/e6ljijim2ev51.jpg"} />
        <Card url={"https://i.redd.it/h0fu7e2fiev51.jpg"} />
        <Card url={"https://i.redd.it/tkcxp9osbev51.png"} />
        <Card url={"https://i.redd.it/pmx34baj3fv51.png"} />
        <Card url={"https://i.redd.it/uebn4xjgoev51.png"} />
        <Card url={"https://i.redd.it/as2yc83tzev51.png"} />
        <Card url={"https://i.redd.it/nnsgy59wtdv51.jpg"} />
        <Card url={"https://i.redd.it/jj7w9xudifv51.jpg"} />
        <Card url={"https://i.redd.it/tdlxft88mev51.jpg"} />
        <Card url={"https://i.redd.it/ktj2k0vd1gv51.png"} />
      </div>
    </div>
  );
}

export default Home;
