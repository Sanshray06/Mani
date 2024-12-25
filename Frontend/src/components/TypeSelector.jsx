import React from 'react';
import { useNavigate } from 'react-router-dom';
import { asset } from '../assets/assets';

const collections = [
  { id: 1, name: 'Necklace Collection', image: asset.necklace, link: '/necklaces' },
  { id: 2, name: 'Earring Collection', image: asset.earring, link: '/earrings' },
  { id: 3, name: 'Anklet Collection', image: asset.anklet, link: '/anklets' },
  { id: 4, name: 'Bangles Collection', image: asset.braclet, link: '/bangles' },
];

const TypeSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-8">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="relative group cursor-pointer"
          onClick={() => navigate(collection.link)}
        >
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-48 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition duration-300"
          />
          {/* Name Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center
                       transition duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <span className="text-white text-lg font-semibold">{collection.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypeSelector;
