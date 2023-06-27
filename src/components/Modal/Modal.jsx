import React, { useEffect } from "react";
import "./Modal.css";
import closeImg from "../../images/card-image/d1.png";

const Modal = ({ error, onClose }) => {
  useEffect(() => {
    const id = +setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  });
  return (
    <div className={"container"}>
      <span>{error}</span>
      <img onClick={onClose} src={closeImg} alt="закрыть" />
    </div>
  );
};

export default Modal;
