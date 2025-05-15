import React, {useEffect, useContext, useState} from 'react'
import {ShopContext} from '../../context/ShopContext.jsx'
import ProductList from '../../components/ProductList.jsx'
import AppLayout from '../../layouts/AppLayout.jsx'
import {usePage} from "@inertiajs/react";
import FeedbackService, { FeedbackType } from '../../services/FeedbackService';
import { useShopContext } from '../../context/ShopContext.jsx'; // Import the custom hook

const Show = (props) => {
  const product = usePage().props.product.data
  const similarProducts = usePage().props.similarProducts.data
  const recommendedProducts = usePage().props.recommendedProducts.data

  const {productId} = props
  // Use the custom hook for ShopContext
  const { currency, addToCart, // Other values you might need from context like products 
        } = useShopContext(); 
  const [image, setImage] = useState(null)
  const [imageList, setImageList] = useState([])
  // const [size, setSize] = useState('') // Removed size state
  // Optional: State to track if the user has liked/disliked this product in the current session
  // const [feedbackStatus, setFeedbackStatus] = useState(null); 

  useEffect(() => {
    if (product) {
        setImage(product.imageUrl)
        // Assuming product.images is an array of image objects { url: 'string' } or just strings
        // For now, using only imageUrl as per previous logic. Adjust if product.images exists and is structured differently.
        let images = [product.imageUrl]; 
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
             // Example: images = [product.imageUrl, ...product.images.map(img => img.url)];
             // Or if product.images are just strings: images = [product.imageUrl, ...product.images];
        }
        setImageList(images)
    }
  }, [product]); // Depend on the product object itself

  const handleFeedback = async (feedbackType) => {
    if (!product || !product.id) return;

    // Assuming you will add FeedbackType.DISLIKE to your FeedbackService.js
    // For now, FeedbackType.LIKE is used. For DISLIKE, ensure it exists.
    const typeToSend = feedbackType === 'like' ? FeedbackType.LIKE : FeedbackType.DISLIKE; // Placeholder for DISLIKE

    try {
      await FeedbackService.storeFeedback(typeToSend, product.id);
      console.log(`Feedback ${typeToSend} sent for product ID: ${product.id}`);
      // Optional: Update feedbackStatus state here
      // setFeedbackStatus(feedbackType);
    } catch (error) {
      console.error(`Error sending ${typeToSend} feedback for product ID: ${product.id}`, error);
    }
  };

  const handleAddToCart = () => {
    // The addToCart from context now expects (productId, options)
    // options can include { quantity }
    addToCart(product.id, { quantity: 1 }); // Removed size from options
    // Defaulting quantity to 1, you can add a quantity selector if needed
  };

  if (!product) {
    return <AppLayout><div>Loading product details...</div></AppLayout>; // Or some other loading state
  }

  return (
    <AppLayout>
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* --------Product Data---------- */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* Product Images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div
              className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                imageList.map((item, index) => (
                  <img
                    onClick={() => setImage(item)}
                    src={item}
                    key={index}
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                    alt={`Product thumbnail ${index + 1}`}
                  />
                ))
              }
            </div>

            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt={product.title || 'Main product image'}/>
            </div>
          </div>

          {/* -----Product Info-------- */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{product.title}</h1>
            
            {/* Like/Dislike Buttons - Replaces star rating */}
            <div className="mt-4 flex space-x-4 items-center">
              <button 
                onClick={() => handleFeedback('like')} 
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition ease-in-out duration-150"
                aria-label="Like this product"
              >
                Like 👍
              </button>
              <button 
                onClick={() => handleFeedback('dislike')} 
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ease-in-out duration-150"
                aria-label="Dislike this product"
              >
                Dislike 👎
              </button>
            </div>

            <p className='mt-5 text-3x1 font-medium'>{currency}{product.price}</p>
            <p className='mt-5 text-3x1'><b>Brand:</b> {product.brand.title}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              {/* Removed Size Selection UI */}
              {/* 
              <p>Select Size</p>
              <div className='flex gap-2'>
                {(product.availableSizes || ['S', 'M', 'L', 'XL']).map((availableSize, index) => (
                  <button onClick={() => setSize(availableSize)}
                          className={`border py-2 px-4 ${availableSize === size ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                          key={index}>{availableSize}
                  </button>
                ))}
              </div>
              */}
              <button onClick={handleAddToCart} // Updated to call handleAddToCart
                      className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' // Removed disabled={!size}
              >ADD TO CART
              </button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p> Original product</p>
                <p>Cash on delivery is avaliable on this product.</p>
                <p> Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
        </div>

        { /* -------Description & Review Section------- */}
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>{product.description}</p>
          </div>
        </div>

        {/*------display related products ------- */}

        <ProductList products={similarProducts} />

        <ProductList title='Personalized' products={recommendedProducts} />
      </div>
    </AppLayout>
  )
}

export default Show
