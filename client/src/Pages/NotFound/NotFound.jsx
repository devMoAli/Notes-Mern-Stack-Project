import './notFound.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
const cat = require('../../assets/errorPage/errorCat.png');

const NotFound = () => {
  return (
    <section className="not-found nf">
      <p className="pageNotFound pnf">
        <Icon icon="svg-spinners:wifi" color="skyblue" width="30" height="30" />{' '}
        Page Not Found
        <Icon
          icon="svg-spinners:wifi"
          color="skyblue"
          width="30"
          height="30"
        />{' '}
      </p>
      <img className="cat" src={cat} alt="" />
      <Link className="not-found-link notFoundLink" to="/">
        Go to Home Page
      </Link>
    </section>
  );
};

export default NotFound;
