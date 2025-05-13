import React from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

export const LatestCollection = ({latestProducts}) => {
    return (
        <section className='my-14 px-4' data-eye="latest-collection-section">
            {/* Section Header */}
            <div className='text-center py-8 max-w-xl mx-auto' data-eye="latest-collection-header">
                <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
                <p
                    className='text-xs sm:text-sm md:text-base text-gray-600 mt-2'
                    data-eye="latest-collection-subtitle"
                >
                    Discover the newest trends and must-have pieces of the season. Created just for you.
                </p>
            </div>

            {/* Products Grid */}
            <div
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                data-eye="latest-products-grid"
            >
                {latestProducts.map((item, index) => (
                    <div key={index} data-eye={`product-card-${index}`}>
                        <ProductItem product={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestCollection;
