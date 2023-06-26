import React, { useState } from "react";
import PropTypes from 'prop-types';

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
}

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose} type="button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
