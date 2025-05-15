import React from 'react'
import {Link} from '@inertiajs/react';

const ProductItem = ({product}) => {
    return (
        <Link className='text-gray-700 cursor-pointer' href={route('products.show', product)}>
            <div className='overflow-hidden aspect-[13/15] bg-gray-200'>
                <img 
                    className='w-full h-full object-cover hover:scale-110 transition ease-in-out' 
                    src={product.imageUrl} 
                    alt={product.title || 'Product image'}
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{product.title}</p>
            <p className='text-sm font-medium'>${product.price}</p>

        </Link>
    )
}

export default ProductItem
