import { useState } from 'react';
import Main from './Main';
import Tabs from './Tabs';

const Home = () => {
  const [tab, setTab] = useState(1);

  return (
    <div class='flex bg-primary items-center justify-center h-screen'>
      <div class='w-3/5 h-5/6 bg-gray-50 text-secondary font-bold rounded-lg border shadow-lg px-10 py-5'>
        <div className='flex flex-wrap h-full'>
          <div className='w-full'>
            <Tabs tab={tab} setTab={setTab} />
            <Main tab={tab} />
            <div className='h-1/6 flex items-center justify-end'>
              <button
                type='submit'
                className='h-10 px-10 py-2 bg-primary text-white text-base font-bold tracking-wider rounded-lg bg-save hover:opacity-90 focus:outline-none transition duration-100 ease-in'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
