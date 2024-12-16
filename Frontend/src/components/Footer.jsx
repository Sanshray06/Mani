import React from 'react'
import { asset } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">

            <div>
                <img src={asset.Logo} className='mb-5 w-32' alt="" />
                <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aliquid.</p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>1. 8427722017</li>
                    <li>2. 9417857266</li>
                    <li>sanshraymittu6@gmail.com</li>
                </ul>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@ Mani Jewelers-All Rights Reserved</p>
            </div>
        </div>

      
    </div>
  )
}

export default Footer
