import React from 'react';

function StatusBox({ title, description, status }) {
  const statusColors = {
    pending: 'yellow-100 text-yellow-800',
    in_progress: 'blue-100 text-blue-800',
    done: 'green-100 text-green-800',
    rejected: 'red-100 text-red-800',
  };

  return (
    <div className='w-[95%] border-2 mx-auto rounded-3xl mt-4'>
        <div className='flex justify-between items-center '>
            <div className='text-2xl ml-4'>{title}</div>
            <div className={`bg-${statusColors[status]} m-4 p-1 px-2 rounded-2xl`}>{status.replace('_', " ").toUpperCase()}</div>
        </div>
        <div className={`border border-${statusColors[status]} mx-5`}></div>
        <p className=' text-amber-600 ml-4 my-2'>{description}</p>
    </div>
  );
}

export default StatusBox;
