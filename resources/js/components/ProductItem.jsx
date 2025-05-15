import React from 'react'
import {Link} from '@inertiajs/react';
import FeedbackService, { FeedbackType } from '../services/FeedbackService';

const ProductItem = ({product}) => {

    const handleProductClick = () => {
        if (product && product.id) {
            FeedbackService.storeFeedback(FeedbackType.CLICK, product.id)
                .then(() => {
                    console.log(`Feedback CLICK sent for product ID: ${product.id}`);
                })
                .catch(error => {
                    console.error(`Error sending CLICK feedback for product ID: ${product.id}`, error);
                });
        }
    };

    return (
        <Link 
            className='text-gray-700 cursor-pointer' 
            href={route('products.show', product)} 
            onClick={handleProductClick}
        >
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
