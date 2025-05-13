import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import {assets} from "../assets/assets"
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import AppLayout from "@/Layouts/AppLayout.jsx";

const Collection = () => {
  const {products} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(true)
  const [filterProducts, setFilterProducts] = useState([])

  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [color, setColor] = useState([])
  const [sortType, setSortType] = useState('relavent')

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  const toggleFilter = (value, stateArray, setState) => {
    if (stateArray.includes(value)) {
      setState(prev => prev.filter(item => item !== value))
    } else {
      setState(prev => [...prev, value])
    }
  }

  const applyFilter = () => {
    let filtered = products.slice()

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory))
    }
    if (color.length > 0) {
      filtered = filtered.filter(item => color.includes(item.baseColour))
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilterProducts(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, color, sortType])

  return (
    <AppLayout>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

        {/* Filter Sidebar */}
        <div className='min-w-60'>
          <p
            className='my-2 text-xl flex items-center cursor-pointer gap-2'
            onClick={() => setShowFilter(!showFilter)}
          >
            <img className='h-3 sm:hidden rotate-90' src={assets.dropdown_icon}/>
            FILTERS
          </p>

          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORY</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Men', 'Women', 'Kids'].map((value, index) => (
                <label key={index} className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={value}
                         onChange={(e) => toggleFilter(e.target.value, category, setCategory)}/>
                  {value}
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((value, index) => (
                <label key={index} className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={value}
                         onChange={(e) => toggleFilter(e.target.value, subCategory, setSubCategory)}/>
                  {value}
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>COLOR</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Black', 'White', 'Blue', 'Red', 'Green'].map((value, index) => (
                <label key={index} className='flex gap-2'>
                  <input className='w-3' type='checkbox' value={value}
                         onChange={(e) => toggleFilter(e.target.value, color, setColor)}/>
                  {value}
                </label>
              ))}
            </div>
          </div>

          {/* Style Filter (Statik) */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>STYLE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Street', 'Minimal', 'Edgy', 'Casual', 'Sporty', 'Bold'].map((value, index) => (
                <label key={index} className='flex gap-2'>
                  <input className='w-3' type='checkbox' disabled/>
                  {value}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1='ALL' text2='COLLECTIONS'/>
            <select
              className='border-2 border-gray-300 text-sm px-2'
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value='relavent'>Sort by: Relevance</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Collection;
