import React from 'react';
import { NavLink } from 'react-router-dom';
import { asset } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className=' top-25 left-0 h-screen w-[18%] min-h-screen border-r-2 bg-gray-50'>
      <div className='flex flex-col gap-4 pt-6 px-4 md:pl-[20%] text-sm'>
        <NavLink
          to='/add'
          className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-100 transition-all'
          activeClassName='bg-gray-200 font-semibold'
        >
          <img src={asset.add} alt='Add Items' className='w-5 h-5' />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink
          to='/list'
          className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-100 transition-all'
          activeClassName='bg-gray-200 font-semibold'
        >
          <img src={asset.shoppingBag} alt='Order List' className='w-5 h-5' />
          <p className='hidden md:block'>Order List</p>
        </NavLink>
        <NavLink
          to='/orders'
          className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-100 transition-all'
          activeClassName='bg-gray-200 font-semibold'
        >
          <img src={asset.item} alt='Orders' className='w-5 h-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
