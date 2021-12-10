import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '../utils/alert';
import useLocalStorage from '../utils/useLocalStorage';

const Confirmation = () => {
  const [error, setError] = useState('');
  const [payment, setPayment] = useState({});
  const [id] = useLocalStorage('id', '');

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/payments/${id}`)
        .then(async (res) => {
          console.log('resss', res);
          if (res.status === 200 && res.data._id) {
            const data = res.data;
            const user = data?.user.firstName + ' ' + data?.user.lastName;
            console.log('user', user);
            const resData = {
              id: data?._id,
              user,
              amount: data?.amount.omr,
            };

            setPayment(resData);
          } else {
            setError('Error 1: ' + res.data.status);
          }
        })
        .catch((errors) => {
          setError('Error 2: ' + errors);
        });
    }
  }, [id]);

  console.log(id);

  return id ? (
    <>
      {error ? <Alert message={error} /> : null}
      <div className='flex flex-col'>
        <div className='w-full flex flex-col justify-center items-center mb-2 text-center'>
          <div className='ml-5'>
            <div className='mb-6 text-center md:mb-8'>
              <h2 className='mb-2 text-2xl text-green-500 font-bold md:text-2xl lg:text-3xl md:mb-4'>
                Payment Successful
              </h2>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center mb-4'>
          <h1 className='uppercase px-2 text-md font-bold md:text-lg lg:text-xl'>
            Summary
          </h1>
          <div className='w-full px-2 my-2'>
            <ul className='w-full relative'>
              <li className='w-full mb-3 bg-white p-3 shadow-lg rounded transition-colors border-b-2 border-transparent hover:border-primary'>
                <div className='w-full flex items-center'>
                  <div className='w-2/3 text-sm font-bold uppercase'>
                    Order ID
                  </div>
                  <div className='w-1/3 text-right font-semibold text-gray-500'>
                    {payment.id}
                  </div>
                </div>
              </li>
              <li className='mb-3 bg-white p-3 shadow-lg rounded transition-colors border-b-2 border-transparent hover:border-primary'>
                <div className='w-full flex items-center'>
                  <div className='w-2/3 text-sm font-bold uppercase'>
                    Customer name
                  </div>
                  <div className='w-1/3 text-right font-semibold text-gray-500'>
                    {payment.user}
                  </div>
                </div>
              </li>
              <li className='mb-3 bg-white p-3 shadow-lg rounded transition-colors border-b-2 border-transparent hover:border-primary'>
                <div className='w-full flex items-center'>
                  <div className='w-2/3  text-sm font-bold uppercase'>
                    Total Amount
                  </div>
                  <div className='w-1/3 text-right font-semibold text-gray-500'>
                    OMR {payment.amount}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <button
          onClick={() => window.location.reload(false)}
          className='h-10 px-10 py-2 bg-gray-400 text-white text-base font-bold uppercase tracking-wider rounded-lg bg-save hover:opacity-90 focus:outline-none transition duration-100 ease-in'>
          Done
        </button>
      </div>
    </>
  ) : null;
};

export default Confirmation;
