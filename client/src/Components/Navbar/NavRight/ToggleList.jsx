import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./navRight.css";

const NavToggleList = ({ setToggle, toggle }) => {
  const toggleListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleListRef.current &&
        !toggleListRef.current.contains(event.target)
      ) {
        // Clicked outside of the toggle list, close the list here
        setToggle(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setToggle]);

  return (
    <div className="nav-toggle-list">
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="navToggleList"
        ref={toggleListRef}
      >
        {toggle ? (
          <Icon
            className="navToggleListIcon"
            icon="bx:message-square-x"
            color="orange"
            rotate={2}
            hFlip={true}
            vFlip={true}
            width={21}
            height={21}
          />
        ) : (
          <Icon
            className="navToggleListIcon"
            icon="line-md:list"
            color="white"
            width={21}
            height={21}
          />
        )}
      </div>
    </div>
  );
};

export default NavToggleList;
