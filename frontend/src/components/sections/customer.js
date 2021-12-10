import { useState } from 'react';
import Alert from '../utils/alert';

const Customer = (props) => {
  const { setTab, setCustomerData } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validate = (data) => {
    let errors = '';

    if (!data.user.firstName || !data.user.lastName) {
      errors = 'Please enter first and last name. ';
    } else if (
      data.user.firstName.length > 20 ||
      data.user.lastName.length > 20
    ) {
      errors += 'First and last name cannot exceed 20 characters. ';
    }

    if (!data.user.email) {
      errors += 'Please enter email. ';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.user.email)
    ) {
      errors += 'Invalid email address. ';
    }

    setError(errors);

    if (errors) {
      return false;
    }

    return true;
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    const data = {
      user: {
        firstName,
        lastName,
        phone,
        email,
      },
      address,
    };

    const isValid = validate(data);

    if (isValid) {
      setCustomerData(data);
      setTab(2);
    }
  };

  return (
    <>
      {error ? <Alert message={error} /> : null}
      <div className='flex mb-4'>
        <div className='w-1/2 flex justify-start'>
          <div className='w-11/12'>
            <label htmlFor='first-name' className='text-base font-semibold'>
              First Name
            </label>
            <input
              id='first-name'
              type='first-name'
              name='first-name'
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
            />
          </div>
        </div>
        <div className='w-1/2 flex justify-end'>
          <div className='w-11/12'>
            <label htmlFor='last-name' className='text-base font-semibold'>
              Last Name
            </label>
            <input
              id='last-name'
              type='last-name'
              name='last-name'
              onChange={(e) => setLastName(e.target.value)}
              className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
            />
          </div>
        </div>
      </div>
      <div className='flex mb-4'>
        <div className='w-1/2 flex justify-start'>
          <div className='w-11/12'>
            <label htmlFor='phone' className='mb-2 text-base font-semibold'>
              Phone Number
            </label>
            <input
              id='phone'
              type='text'
              name='phone'
              onChange={(e) => setPhone(e.target.value)}
              className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
            />
          </div>
        </div>
        <div className='w-1/2 flex justify-end'>
          <div className='w-11/12'>
            <label htmlFor='email' className='mb-2 text-base font-semibold'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col mb-6'>
        <label htmlFor='address' className='mb-2 text-base font-semibold'>
          Address
        </label>
        <input
          id='address'
          type='text'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          className='w-full px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
        />
      </div>
      <div className='flex items-center justify-end '>
        <button
          onClick={(e) => handleNextClick(e)}
          className='h-10 px-10 py-2 bg-primary text-white text-base font-bold uppercase tracking-wider rounded-lg bg-save hover:opacity-90 focus:outline-none transition duration-100 ease-in'>
          Next
        </button>
      </div>
    </>
  );
};

export default Customer;
