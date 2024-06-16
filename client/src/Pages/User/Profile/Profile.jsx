import "./profile.css";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUserProfile,
  deleteProfile,
} from "../../../Redux/Apicalls/profileApicall";
import { logoutUser } from "../../../Redux/Apicalls/authApicall";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const dispatch = useDispatch();

  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  if (loading) {
    return (
      <div className="profile-loader">
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      </div>
    );
  }
  return (
    <section className="profile">
      <div className="profile-header">
        <h1 className="profile-username">{profile?.username}</h1>

        <p className="profile-email">{profile?.email}</p>
        <div>
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            Update Account Info
          </button>

          {user?._id === profile?._id && (
            <button
              onClick={deleteAccountHandler}
              className="delete-account-btn"
            >
              Delete Account
            </button>
          )}
        </div>
      </div>

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
