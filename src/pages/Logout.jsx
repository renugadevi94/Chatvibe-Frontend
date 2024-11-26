import React from "react";
import "./logout.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Logout = () => {
  const { handleLogout } = useContext(DataContext);
  return (
    <div className='loggedOut'>
      <div className='body__container p-5 rounded'>
        <h3 className='text-center mb-5'>
          Page Not found and try again. Kindly go to Login page
        </h3>
        <div className='text-center'>
          <Link
            to='/login'
            onClick={handleLogout}
            className='btn btn-success'
          >
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;