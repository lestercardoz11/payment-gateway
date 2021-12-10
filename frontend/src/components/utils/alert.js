import React, { useState } from 'react';

const Alert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <>
      {showAlert ? (
        <div className='absolute top-5 right-5 text-white px-6 py-4 border-0 rounded mb-4 bg-pink-500'>
          <span className='text-xl inline-block mr-5 align-middle'>
            <i className='fas fa-bell' />
          </span>
          <span className='inline-block align-middle mr-8'>
            <b className='capitalize'>Error: </b> {message}
          </span>
          <button
            className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
            onClick={() => setShowAlert(false)}>
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
