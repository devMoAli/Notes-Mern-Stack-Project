import { passwordActions } from "../Slices/passwordSlice";
import request from "../../Utils/request";
import { toast } from "react-toastify";

// Forgot Password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Reset Password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      dispatch(passwordActions.setError());
    }
  };
}

// Reset Password
export function resetPassword(newPassword, user) {
  return async () => {
    try {
      const response = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };
}
