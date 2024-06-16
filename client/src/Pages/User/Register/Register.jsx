import './register.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../Redux/Apicalls/authApicall';
import swal from 'sweetalert';

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const avatar = require('../../../assets/form/avatar.png');
  const navigate = useNavigate();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === '') return toast.error('Username is required');
    if (email.trim() === '') return toast.error('Email is required');
    if (password.trim() === '') return toast.error('Password is required');

    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (registerMessage) {
      swal({
        title: 'Registration successful',
        icon: 'success',
      }).then((isOk) => {
        if (isOk) {
          navigate('/login');
        }
      });
    }
  }, [registerMessage, navigate]);
 return (
    <section className="register-form-container">
      <div className="registerFormContainer">
        <form onSubmit={formSubmitHandler} className="registerForm">
          <img className="formAvatar" src={avatar} alt="" />
          <div className="registerTitle">
            <Icon
              className="registerIcon"
              icon="mdi:register"
              color="orange"
              hFlip={true}
              style={{
                animation: 'pulse 3s linear infinite',
              }}
            />
            <p className="regTitle">Register </p>
          </div>
          <p className="message">Sign up now and get full access to our app </p>

          <div className="form-group">
            <label htmlFor="username" className="registerFormLabel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="inputIcon"
              >
                <path
                  fill="url(#paint0_linear_1233_4795)"
                  fillRule="evenodd"
                  d="M8 4C8 3.44772 8.44772 3 9 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H9C8.44772 21 8 20.5523 8 20V17C8 16.4477 8.44772 16 9 16C9.55228 16 10 16.4477 10 17V19H20V5H10V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V4ZM10.7929 7.79289C11.1834 7.40237 11.8166 7.40237 12.2071 7.79289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L12.2071 16.2071C11.8166 16.5976 11.1834 16.5976 10.7929 16.2071C10.4024 15.8166 10.4024 15.1834 10.7929 14.7929L12.5858 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H12.5858L10.7929 9.20711C10.4024 8.81658 10.4024 8.18342 10.7929 7.79289Z"
                  clipRule="evenodd"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_1233_4795"
                    x1="12"
                    x2="12"
                    y1="3"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#57EAEA"></stop>
                    <stop offset="1" stopColor="#2BC9FF"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="username"
                placeholder="username"
                className="registerFormInput"
              />
            </label>

            <label htmlFor="email" className="registerFormLabel">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="inputIcon"
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
                className="registerFormInput"
              />
            </label>

            <label htmlFor="password" className="registerFormLabel">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="inputIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                ></path>
                <path
                  fill="#141B34"
                  d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
                ></path>
              </svg>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Password"
                className="registerFormInput"
              />
            </label>
          </div>
          <button type="submit" className="form-btn">
            Register
          </button>

          <div className="signin">
            Already have an account?{' '}
            <Link className="login" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
      </section>
  );
};


export default Register;
