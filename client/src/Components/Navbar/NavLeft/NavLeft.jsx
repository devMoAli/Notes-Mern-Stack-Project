import React from "react";
import "./navLeft.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
const NavLeft = () => {
  return (
    <div className="navbar-left">
      {" "}
      <FontAwesomeIcon className="icon" icon={faNoteSticky} />
      <div className="title">
        <span className="notes-text">Notes</span>
        <span className="project-text">Project</span>
      </div>
    </div>
  );
};

export default NavLeft;
