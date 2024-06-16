import { authActions } from "../Slices/authSlice";
import request from "../../Utils/request";
import { toast } from "react-toastify";

// Login
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const response = await request.post("/api/auth/login", user);
      const data = response.data;
      if (response.status === 200) {
        // Update Redux store with user data
        dispatch(authActions.login({ ...data, userId: data.userId }));
        // Store user information in local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      console.error(error);
      toast.error("An error occurred during login.");
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

//  Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);

      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}
