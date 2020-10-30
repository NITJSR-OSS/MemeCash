import React, { useContext } from "react";
import "../CSS/Navbar.css";
import Popup from "./Popup";
import { Web3Context } from "../context/web3context";
//import { useContext } from "react";

function Navbar() {
  const { account } = useContext(Web3Context);

  return (
    <div className="nav">
      <div className="brand nav-left">
        <div>
          <img className="logo" />
        </div>
        <h3>MemeCash</h3>
      </div>

      <div className="nav-right">
        <Popup />
        <li className="account">{account}</li>
      </div>
    </div>
  );
}

export default Navbar;
