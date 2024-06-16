import './form.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../Redux/Apicalls/passwordApicall';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const avatar = require('../../../assets/form/security.png');

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === '') return toast.error('Email is required');

    dispatch(forgotPassword(email));
  };

  return (
    <section className="forgotPassContainer">
      <div className="formContainer">
        <form onSubmit={formSubmitHandler} className="forgotPasswordForm">
          <img className="formPassAvatar passAvatar" src={avatar} alt="" />

          <div className="forgotPassTitle">
            <div className="passIcon pulse">
              <Icon
                icon="ic:twotone-password"
                color="orange"
                width="30"
                height="30"
              />
            </div>
            <h3 className="passwordTitle">Password Assistance</h3>
            <div className="passIcon pulse">
              <Icon
                icon="ic:twotone-password"
                color="orange"
                width="30"
                height="30"
              />
            </div>
          </div>

          <div className="form-password-note">
            <h5>Please Type your Email, click Submit</h5>
            <h6>
              you should receive an Email from us includes a link to reset your
              Password
            </h6>
          </div>

          <div className="forgotPassInputContainer">
            <label
              htmlFor="email"
              className="forgotPassInputLabel forgotPassEmailInput"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="inputIconForgot"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                ></path>
              </svg>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="name@mail.com"
                className="form-password-input formEmailInput"
              />
            </label>
          </div>

          <button type="submit" className="form-btn">
            Submit
          </button>

          <div className="signin">
            Already have an account?{' '}
            <Link className="login" to="/login">
              Login
            </Link>
          </div>
          <div className="signin">
            If you don't have an account{' '}
            <Link className="register" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
