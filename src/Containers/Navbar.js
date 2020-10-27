import React from "react";
import "../CSS/Navbar.css";
import Popup from "./Popup";

function Navbar() {
  return (
    <div className="nav">
      <div className="brand nav-left">
        <h3>MemeCash</h3>
      </div>

      <div className="nav-right">
        <Popup />
      </div>
    </div>
  );
}

export default Navbar;
