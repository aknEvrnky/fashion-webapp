import React from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = ({bestProducts}) => {
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestProducts.map((item, index) => (
                        <ProductItem key={index} product={item}/>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
