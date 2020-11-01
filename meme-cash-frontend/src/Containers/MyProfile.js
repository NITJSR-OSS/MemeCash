import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import "../CSS/MyProfile.css";
import MyMemes from "./MyMemes";
import { FaUserAlt } from "react-icons/fa";
import { Web3Context } from "../context/web3context";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    backgroundColor: "#eee",
  },
};

function MyProfile() {
  const { account, memeABI, web3, myMemes } = useContext(Web3Context);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <div className="MyProfile">
      <button onClick={openModal} className="openModal">
        <FaUserAlt />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="close">
          &#10005;
        </button>
        <div className="Account">
          <h2 className="account">User Account: &nbsp;</h2>
          <h3 className="accountNo">{account}</h3>
        </div>
        {myMemes.map((meme) => {
          return <MyMemes key={meme} memeAddress={meme} />;
        })}
      </Modal>
    </div>
  );
}

export default MyProfile;
