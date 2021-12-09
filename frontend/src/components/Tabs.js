const Tabs = ({ tab, setTab }) => {
  return (
    <div className='h-1/6 flex justify-evenly items-center' role='tablist'>
      <button
        className={
          'w-1/4 flex flex-col items-center text-xs font-bold uppercase px-5 py-3 ' +
          (tab >= 1 ? 'text-primary' : 'text-gray-400')
        }
        onClick={(e) => {
          e.preventDefault();
          setTab(1);
        }}
        data-toggle='tab'
        role='tablist'>
        <span
          className={
            'h-10 w-10 m-1 flex items-center justify-center text-lg rounded-full border-2 ' +
            (tab >= 1 ? 'border-primary' : 'border-gray-400')
          }>
          1
        </span>
        Customer Details
      </button>
      <button
        className={
          'w-1/4 flex flex-col items-center text-xs font-bold uppercase px-5 py-3 ' +
          (tab >= 2 ? 'text-primary' : 'text-gray-400')
        }
        onClick={(e) => {
          e.preventDefault();
          setTab(2);
        }}
        data-toggle='tab'
        role='tablist'>
        <span
          className={
            'h-10 w-10 m-1 flex items-center justify-center text-lg rounded-full border-2 ' +
            (tab >= 2 ? 'border-primary' : 'border-gray-400')
          }>
          2
        </span>
        Payment
      </button>
      <button
        className={
          'w-1/4 flex flex-col items-center text-xs font-bold uppercase px-5 py-3 ' +
          (tab >= 3 ? 'text-primary' : 'text-gray-400')
        }
        onClick={(e) => {
          e.preventDefault();
          setTab(3);
        }}
        data-toggle='tab'
        role='tablist'>
        <span
          className={
            'h-10 w-10 m-1 flex items-center justify-center text-lg rounded-full border-2 ' +
            (tab >= 3 ? 'border-primary' : 'border-gray-400')
          }>
          3
        </span>
        Confirmation
      </button>
    </div>
  );
};

export default Tabs;
