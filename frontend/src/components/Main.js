const Main = ({ tab }) => {
  return (
    <div className='h-4/6 flex flex-col w-full'>
      <div className='px-4 py-5 flex-auto'>
        <div className={tab === 1 ? 'block' : 'hidden'}>Tab 1</div>
        <div className={tab === 2 ? 'block' : 'hidden'}>Tab 2</div>
        <div className={tab === 3 ? 'block' : 'hidden'}>Tab 3</div>
      </div>
    </div>
  );
};

export default Main;
