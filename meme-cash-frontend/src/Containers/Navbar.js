import React from "react";
import "../CSS/Navbar.css";
import Popup from "./Popup";
import MyProfile from "./MyProfile";

function Navbar() {
  return (
    <div className="nav">
      <div className="brand nav-left">
        <div>
          <img className="logo" />
        </div>
        <h3>MemeCash</h3>
      </div>

      <div className="nav-right">
        <abbr title="Upload Memes">
          <Popup />
        </abbr>
        <abbr title="My Profile">
          <MyProfile />
        </abbr>
      </div>
    </div>
  );
}

export default Navbar;
