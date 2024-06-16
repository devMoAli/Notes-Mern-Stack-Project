import "./update-profile-modal.css";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../Redux/Apicalls/profileApicall";

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(profile.username);

  const [password, setPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="update-profile-form-close"
          >
            <Icon icon="material-symbols:tab-close" color="orange" />
          </i>
        </abbr>
        <h1 className="update-profile-title">Update Account Info</h1>

        <label className="openModalLabel" htmlFor="username">
          UserName
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          className="update-profile-input"
          placeholder="Username"
        />

        <label className="openModalLabel" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
