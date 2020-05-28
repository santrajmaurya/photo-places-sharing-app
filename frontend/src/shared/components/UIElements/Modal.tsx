import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import "./Modal.scss";

interface ModalOverlayProps {
  className?: string;
  style?: any;
  headerClass?: string;
  header?: string;
  onSubmit?: any;
  contentClass?: string;
  children?: any;
  footerClass?: string;
  footer?: any;
}

interface ModalProps {
  show?: boolean;
  onCancel?: () => void;
  header?: string;
  contentClass?: string;
  footerClass?: string;
  footer?: any;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ ...props }) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLFormElement
  );
};

const Modal: React.FC<ModalProps> = ({ show, onCancel, ...props }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
