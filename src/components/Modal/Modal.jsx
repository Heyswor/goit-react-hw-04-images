import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscPress);

    return () => {
      return window.removeEventListener('keydown', handleEscPress);
    };
  });

  function handleEscPress(evt) {
    if (evt.code === 'Escape') {
      onClose();
    }
  }
  function handleBackdropClick(event) {
    console.log(event.target);
    console.log(event.currentTarget);
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
