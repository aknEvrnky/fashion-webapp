import React, { useContext, useEffect, useState } from 'react'
import {Link, router} from '@inertiajs/react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const ProductList = ({ products, title }) => {
  if (!title) {
    title = 'Related'
  }

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={title} text2="PRODUCTS" />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {products.map((item, index) => (
          <ProductItem key={index} product={item}/>
        ))}
      </div>
    </div>
  )
}

export default ProductList
