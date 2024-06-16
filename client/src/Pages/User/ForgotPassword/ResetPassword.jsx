import "./form.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../../Redux/Apicalls/passwordApicall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token, dispatch]);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <h3 className="password">Reset Password </h3>

              <h5 className="form-reset-password-note ">
                Please Enter your New Password
              </h5>
              <div className="reset-pass">
                <label htmlFor="password" className="form-reset-label">
                  New Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Enter your new password"
                  className="form-reset-password-input"
                />
                <label htmlFor="password" className="form-reset-label ">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password confirm"
                  placeholder="Confirm your new password"
                  className="form-reset-password-input"
                />
              </div>
            </div>
            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
