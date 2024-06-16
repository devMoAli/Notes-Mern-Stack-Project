import NotFound from "../../NotFound/NotFound";
import "./verifyEmail.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail } from '../../../Redux/Apicalls/authApicall';
import { useEffect } from 'react';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector((state) => state.auth);
  
    const { userId, token } = useParams();
  
    useEffect(() => {
      dispatch(verifyEmail(userId, token));
    }, [userId, token, dispatch]);

  return (
    <section className="verify-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon">
            <h1 className="verify-email-title">
              Your Email Address Successfully Verified
            </h1>
            <Link to="/login" className="verify-email-link">
              Please Login to your Account
            </Link>
          </i>
        </>
      ) : (
        <>
          <Link to="/NotFound">
            <NotFound />
          </Link>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
