import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { asset } from '../assets/assets';

const Navbar = () => {
  const [visible ,setVisible] = useState(false);
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            src={asset.Logo}
            className="w-24 md:w-28 h-auto object-contain rounded-md transition-all duration-300"
            alt="Mani Jewellers Logo"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8">
          <ul className="flex gap-4 md:gap-8 text-gray-700 text-sm md:text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-900 ${isActive ? 'font-medium' : ''}`
                }
              >
                <img
                  src={asset.home}
                  className="w-5 h-5 object-contain rounded-md transition-transform duration-300 ease-in-out hover:scale-150 hover:rotate-5"
                  alt="Home Icon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-gray-900 ${isActive ? 'font-medium' : ''}`
                }
              >
                <img
                  src={asset.aboutus}
                  className="w-5 h-5 object-contain rounded-md transition-transform duration-300 ease-in-out hover:scale-150 hover:rotate-5"
                  alt="About Us Icon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-gray-900 ${isActive ? 'font-medium' : ''}`
                }
              >
                <img
                  src={asset.customerservice}
                  className="w-5 h-5 object-contain rounded-md transition-transform duration-300 ease-in-out hover:scale-150 hover:rotate-5"
                  alt="Contact Us Icon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `hover:text-gray-900 ${isActive ? 'font-medium' : ''}`
                }
              >
                <img
                  src={asset.category}
                  className="w-5 h-5 object-contain rounded-md transition-transform duration-300 ease-in-out hover:scale-150 hover:rotate-5"
                  alt="Categories Icon"
                />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side Elements */}
        <div className="flex items-center gap-4 md:gap-8 relative">
          <img
            src={asset.loupe}
            className="w-5 h-5 object-contain rounded-md cursor-pointer"
            alt="Search Icon"
          />
          
          <div className="relative group">
            <img className="w-5 cursor-pointer" src={asset.user} alt="Profile Pic" />
            <div className="absolute right-0 hidden group-hover:block pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img src={asset.shoppingbag} className="w-5 min-w-5" alt="Cart Icon" />
            <p className="absolute right-[-5px] bottom-[-9px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
              4
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={asset.menu}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu Icon"
          />

          {/* Sidebar for Small Screens */}
          {/* Sidebar for Small Screens */}
          <div
            className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-transform transform ${
              visible ? 'translate-x-0' : 'translate-x-full'
            } w-3/4 max-w-sm h-full overflow-hidden`}
          >
            <div className="flex flex-col text-gray-600 p-3">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img className="h-4 rotate-180" src={asset.back} alt="Back Icon" />
                <p>Back</p>
              </div>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/about"
              >
                ABOUT US
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/contact"
              >
                CONTACT US
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;