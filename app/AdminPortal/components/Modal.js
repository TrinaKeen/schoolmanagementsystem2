// components/Modal.js
import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <h2 id="modal-title">{title}</h2>
        <button
          className="absolute top-2 right-6 z-50 text-gray-500 hover:text-black font-bold rounded-full p-2 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
