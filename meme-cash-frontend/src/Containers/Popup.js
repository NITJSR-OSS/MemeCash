import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../CSS/Popup.css";
import Upload from "../Components/Upload";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

function Popup() {
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
    <div className="popup">
      <button onClick={openModal} className="openModal">
        +
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
        <Upload closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default Popup;
