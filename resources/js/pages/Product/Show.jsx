import React, {useEffect, useContext, useState} from 'react'
import {ShopContext} from '../../context/ShopContext.jsx'
import {assets} from '@/assets/assets.js'
import ProductList from '../../components/ProductList.jsx'
import AppLayout from '../../layouts/AppLayout.jsx'
import {usePage} from "@inertiajs/react";

const Show = (props) => {
  const product = usePage().props.product.data
  const similarProducts = usePage().props.similarProducts.data
  // const userBasedProducts = usePage().props.userBasedProducts.data

  const {productId} = props
  const {products, currency, addToCart} = useContext(ShopContext)
  const [image, setImage] = useState(null)
  const [imageList, setImageList] = useState([])
  const [size, setSize] = useState('')

  useEffect(() => {
    setImage(product.imageUrl)
    let images = [product.imageUrl]
    setImageList(images)

  }, [productId, products])

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
                    alt=''
                  />
                ))
              }
            </div>

            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt=''/>
            </div>
          </div>

          {/* -----Product Info-------- */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{product.title}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3.5"/>
              <img src={assets.star_icon} alt="" className="w-3.5"/>
              <img src={assets.star_icon} alt="" className="w-3.5"/>
              <img src={assets.star_icon} alt="" className="w-3.5"/>
              <img src={assets.star_dull_icon} alt="" className="w-3.5"/>
              <p className='p1-2'>(122)</p>
            </div>
            <p className='mt-5 text-3x1 font-medium'>{currency}{product.price}</p>
            <p className='mt-5 text-3x1'><b>Brand:</b> {product.brand.title}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {[].map((item, index) => (
                  <button onClick={() => setSize(item)}
                          className={`border py-2  px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                          key={index}>{item}</button>
                ))}

              </div>
              <button onClick={() => addToCart(product.id, size)}
                      className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART
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

        <ProductList products={similarProducts} />
      </div>
    </AppLayout>
  )
}

export default Show
