import { Link, useNavigate } from "react-router-dom";
import "./navRight.css";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { logoutUser } from "../../../Redux/Apicalls/authApicall";

const NavRight = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // taking the logged in user from the authSlice state
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
    // Navigate to home page on successful Logout
    navigate("/");
  };

  return (
    <div className="navRightContainer">
      {/* user info */}
      <ul className="header__option">
        <div className="header-right" ref={dropdownRef}>
          {user ? (
            <>
              <div
                className="header-right-user-info"
                onClick={() => setDropdown((prev) => !prev)}
              >
                <span className="header-right-username">{user?.username}</span>
                {dropdown && (
                  <div className="header-right-dropdown">
                    <Link
                      to={`/profile/${user?._id}`}
                      className="header-dropdown-item"
                      onClick={() => setDropdown(true)}
                    >
                      <Icon
                        icon="line-md:account"
                        color="darkorange"
                        width="18"
                        height="18"
                        className="user-info-dropdown-account"
                      />

                      <span>Account</span>
                    </Link>
                    <div
                      onClick={logoutHandler}
                      className="header-dropdown-item"
                    >
                      <Icon
                        icon="basil:logout-outline"
                        className="user-info-dropdown-account"
                        color="darkorange"
                        width="20"
                        height="20"
                      />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login-Register */}
              <ul className="header__option">
                <Link
                  onClick={() => setToggle(false)}
                  to="/register"
                  className="header-right-link header__optionLineOne"
                >
                  <Icon
                    className="navRightIcon"
                    icon="mdi:register"
                    hFlip={true}
                    color="green"
                  />
                  <span>Register</span>
                </Link>

                <Link
                  onClick={() => setToggle(false)}
                  to="/login"
                  className="header-right-link header__optionLineTwo"
                >
                  <Icon icon="entypo:login" color="skyblue" />
                  <span>Login</span>
                </Link>
              </ul>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default NavRight;
