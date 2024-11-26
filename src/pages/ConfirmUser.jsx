import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import { FaRocketchat } from "react-icons/fa";

const ConfirmUser = () => {
  const { handleConfirm, setResetToken } = useContext(DataContext);
  const { id } = useParams();
  useEffect(() => {
    setResetToken(id);
  });
  return (
    <div className='loggedOut'>
      <div className='body__container p-5 rounded text-center'>
        <h1 className='text-center text-light mb-4'>
          <FaRocketchat /> Chat Buddy
        </h1>
        <h3 className='text-center mb-4'>
          Please click Below button to confirm Your account.
        </h3>
        <button
          onClick={handleConfirm}
          className='btn btn-success mb-4'
        >
          Activate Account
        </button>
        <div className='text-center'>
          <Link
            to='/'
            className='btn btn-success'
          >
            cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUser;

