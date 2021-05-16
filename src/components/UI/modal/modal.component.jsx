import React from 'react';
import ReactDOM from 'react-dom';

import './modal.style.scss';

const Backdrop = () => {
  return <div className="backdrop" />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal" style={{textAlign: 'center'}}>
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById('card-root');
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
