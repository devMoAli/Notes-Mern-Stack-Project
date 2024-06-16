import React from "react";
import Notes from "../../Components/Notes/Notes";
import Categories from "../../Components/Categories/Categories";
import { useSelector } from 'react-redux';
import homebg from '../../assets/home/homebg.jpg';

import './home.css';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home-container">
      {user ? (
        <>
          <div className="categories">
            <Categories />
          </div>
          <Notes />
        </>
      ) : (
        <div className="welcome-image-container">
          <img src={homebg} alt="Welcome" className="welcome-image" />
        </div>
      )}
    </div>
  );
};

export default Home;
