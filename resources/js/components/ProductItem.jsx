import React from 'react'
import {Link} from '@inertiajs/react';

const ProductItem = ({product}) => {
    return (
        <Link className='text-gray-700 cursor-pointer' href={route('products.show', product)}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={product.imageUrl} alt=" "/>
            </div>
            <p className='pt-3 pb-1 text-sm'>{product.title}</p>
            <p className='text-sm font-medium'>${product.price}</p>

        </Link>
    )
}

export default ProductItem
