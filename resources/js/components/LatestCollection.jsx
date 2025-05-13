import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

export const LatestCollection = () => {
  const { products } = useContext(ShopContext); 
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <section className='my-14 px-4' data-eye="latest-collection-section">
      {/* Section Header */}
      <div className='text-center py-8 max-w-xl mx-auto' data-eye="latest-collection-header">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p 
          className='text-xs sm:text-sm md:text-base text-gray-600 mt-2' 
          data-eye="latest-collection-subtitle"
        >
          Discover the newest trends and must-have pieces of the season. Curated just for you.
        </p>
      </div>

      {/* Products Grid */}
      <div 
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' 
        data-eye="latest-products-grid"
      >
        {latestProducts.map((item, index) => (
          <div key={index} data-eye={`product-card-${index}`}>
            <ProductItem 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
