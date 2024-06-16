import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./navCenter.css";
import { useNavigate } from "react-router-dom";
import { filterNotes, resetNotes } from "../../../Redux/Apicalls/noteApicall";

const NavCenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "") {
      dispatch(resetNotes()); // Reset to homepage
    } else {
      dispatch(filterNotes(value));
    }
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      dispatch(filterNotes(searchTerm));
    }
    navigate("/");
    setSearchTerm(""); // Clear the search input
  };

  return (
    <div className="headerCenter">
      <div className="searchContainer">
        <form className="header__search" onSubmit={handleSearchSubmit}>
          <input
            className="header__searchInput"
            placeholder="Search Notes..."
            type="text"
            id="navbarSearchInput"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />

          <button className="header__searchIcon" type="submit">
            <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavCenter;
