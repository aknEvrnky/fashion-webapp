import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const SearchOverlay = () => {
  const { setShowSearch, products } = useContext(ShopContext);
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='fixed inset-0 bg-white bg-opacity-95 z-50 p-6 overflow-y-auto'>
      <button onClick={() => setShowSearch(false)} className='mb-4 text-black underline'>
        Close
      </button>

      <input
        type='text'
        placeholder='Search products...'
        className='w-full p-2 border border-gray-400 mb-4'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {filteredProducts.map((item, index) => (
          <div key={index} className='border p-2'>
            <img src={item.image[0]} className='w-full h-32 object-cover' />
            <p className='mt-2 text-sm'>{item.name}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && <p>No matching products.</p>}
      </div>
    </div>
  );
};

export default SearchOverlay;
