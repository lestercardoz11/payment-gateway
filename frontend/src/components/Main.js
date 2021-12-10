import { useState } from 'react';
import Customer from './sections/customer';
import Payment from './sections/payment';
import Confirmation from './sections/confirmation';

const Main = ({ tab, setTab }) => {
  const [customerData, setCustomerData] = useState(null);

  return (
    <div className='h-5/6 flex flex-col w-full'>
      <div className='p-4'>
        <div className={tab === 1 ? 'block' : 'hidden'}>
          <Customer setTab={setTab} setCustomerData={setCustomerData} />
        </div>
        <div className={tab === 2 ? 'block' : 'hidden'}>
          <Payment setTab={setTab} customerData={customerData} />
        </div>
        <div className={tab === 3 ? 'block' : 'hidden'}>
          <Confirmation />
        </div>
      </div>
    </div>
  );
};

export default Main;
