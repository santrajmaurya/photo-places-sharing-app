import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.scss";

interface SideDrawerProps {
  children: any;
  show: boolean;
  onClick: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-n-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as HTMLFormElement
  );
};

export default SideDrawer;
