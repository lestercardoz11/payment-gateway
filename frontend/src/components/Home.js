import { useState } from 'react';
import Main from './Main';
import Tabs from './Tabs';

const Home = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className='flex bg-primary items-center justify-center h-screen'>
      <div className='w-3/5 h-5/6 bg-white text-secondary font-sans rounded-lg border shadow-lg px-10 py-5'>
        <div className='flex h-full'>
          <div className='w-full'>
            <Tabs tab={tab} setTab={setTab} />
            <Main tab={tab} setTab={setTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
