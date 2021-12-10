import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { addDays, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../utils/loader';
import axios from 'axios';
import Alert from '../utils/alert';
import useLocalStorage from '../utils/useLocalStorage';

const Payment = ({ setTab, customerData }) => {
  const [canSave, setCanSave] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState(addDays(new Date(), 30));
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setId] = useLocalStorage('id', '');

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');

  const ExpiryInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 cursor-pointer'
      onClick={onClick}
      ref={ref}>
      {value}
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let omr, usd;
    if (currency === 'OMR') {
      omr = amount * 1;
      usd = omr / 0.39;
    } else if (currency === 'USD') {
      usd = amount * 1;
      omr = usd * 0.39;
    }

    const data = {
      user: customerData.user,
      address: customerData.address,
      card: canSave
        ? {
            name: cardHolder,
            number: cardNumber,
            expiry: format(startDate, 'MM/yy', new Date()),
            securityCode: code,
          }
        : null,
      amount: {
        omr,
        usd,
      },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/payments/save`, data)
      .then((res) => {
        if (res.data.status === 1 && res.data.data._id) {
          setId(res.data.data._id);
          setTab(3);
        } else {
          setError('Error: ' + res.data.status);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error: ' + err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {error ? <Alert message={error} /> : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex mb-4'>
          <div className='w-2/3 flex justify-start'>
            <div className='w-11/12'>
              <label htmlFor='card-number' className='text-base font-semibold'>
                Card Number
              </label>
              <input
                id='card-number'
                type='text'
                pattern='[0-9]{16}'
                name='card-number'
                maxLength='16'
                placeholder='xxxx xxxx xxxx xxxx'
                className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='w-1/3 flex justify-end'>
            <div className='w-11/12'>
              <label htmlFor='expiry-date' className='text-base font-semibold'>
                Expiry Date
              </label>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={addDays(new Date(), 30)}
                customInput={<ExpiryInput />}
                dateFormat='MM/yy'
                showMonthYearPicker
              />
            </div>
          </div>
        </div>
        <div className='flex mb-4'>
          <div className='w-2/3 flex justify-start'>
            <div className='w-11/12'>
              <label
                htmlFor='card-holder'
                className='mb-2 text-base font-semibold'>
                Card Holder Name
              </label>
              <input
                id='card-holder'
                type='text'
                name='card-holder'
                maxLength='100'
                className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
                onChange={(e) => setCardHolder(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='w-1/3 flex justify-end'>
            <div className='w-11/12'>
              <label
                htmlFor='security-code'
                className='mb-2 text-base font-semibold'>
                Security Code
              </label>
              <input
                id='security-code'
                type='text'
                pattern='\d*'
                name='security-code'
                maxLength='3'
                placeholder='xxx'
                className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className='flex mb-4'>
          <div className='w-1/3 flex justify-start'>
            <div className='w-11/12'>
              <label
                htmlFor='currency'
                className='mb-2 text-base font-semibold'>
                Currency
              </label>
              <div className='relative'>
                <button
                  className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMenu(!showMenu);
                  }}>
                  {currency}
                </button>

                {showMenu ? (
                  <div className='absolute w-full mt-2  text-sm text-secondary bg-gray-100 rounded-md shadow-lg overflow-visible z-20'>
                    <div className='py-1'>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrency('OMR');
                        }}
                        className={
                          'w-full flex items-center p-2 border-l-4 tracking-wider font-semibold' +
                          (currency === 'OMR'
                            ? ' border-secondary'
                            : ' border-transparent')
                        }>
                        OMR
                      </button>
                    </div>
                    <div className='py-1'>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrency('USD');
                        }}
                        className={
                          'w-full flex items-center p-2 border-l-4 tracking-wider font-semibold' +
                          (currency === 'USD'
                            ? ' border-secondary'
                            : ' border-transparent')
                        }>
                        USD
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className='w-2/3 flex justify-end'>
            <div className='w-11/12'>
              <label htmlFor='amount' className='mb-2 text-base font-semibold'>
                Total Amount
              </label>
              <input
                id='amount'
                name='amount'
                type='number'
                min='0.01'
                step='0.01'
                max='1000'
                className='w-full mt-2 px-4 py-2 font-semibold bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200'
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className='w-1/3 flex justify-between items-center mb-6'>
          <label htmlFor='save-card' className='mb-2 text-base font-semibold'>
            Save Card Details
          </label>
          <div
            id='save-card'
            name='save-card'
            className='relative cursor-pointer'
            onClick={() => setCanSave(!canSave)}>
            <div
              className={`block w-10 h-5 rounded-full transition duration-100 ease-in ${
                canSave ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            <div
              className={`absolute top-1 bg-white w-3 h-3 rounded-full transition duration-100 ease-in ${
                canSave ? 'right-1' : 'left-1'
              }`}></div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='w-1/2 h-10 px-10 py-2 flex justify-center bg-primary text-white text-base font-bold uppercase tracking-wider rounded-lg bg-save hover:opacity-90 focus:outline-none transition duration-100 ease-in'>
            {isLoading ? <Loader color={'text-white'} /> : 'Pay'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Payment;
