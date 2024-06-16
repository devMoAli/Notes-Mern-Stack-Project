import React from "react";
import "./navbar.css";
import { useState } from "react";
import NavRight from "../Navbar/NavRight/NavRight";
import NavToggleList from "../Navbar/NavRight/ToggleList";
import { Link } from "react-router-dom";
import NavLeft from "./NavLeft/NavLeft";
import NavCenter from "./NavCenter/NavCenter";
import AddNewNote from "./AddNewNote/AddNewNote";
function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <NavLeft />
        </Link>
      </div>

      <div className="nav-center">
        <NavCenter />
      </div>
      <div className="addNoteBtn">
        <AddNewNote />
      </div>

      <div className="headerRightMenu">
        <NavRight toggle={toggle} setToggle={setToggle} />
        <NavToggleList toggle={toggle} setToggle={setToggle} />
      </div>
    </div>
  );
}

export default Navbar;
