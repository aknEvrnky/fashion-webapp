import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'

const Recommendation = () => {
  const { products } = useContext(ShopContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const [recommended, setRecommended] = useState([])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))

      const tshirtRecommendations = products.filter(item =>
        item.name.toLowerCase().includes('t-shirt')
      ).slice(0, 8)

      setRecommended(tshirtRecommendations)
    }
  }

  const getFilteredProducts = (keyword, limit = 8) => {
    return products.filter(item =>
      item.name.toLowerCase().includes(keyword)
    ).slice(0, limit)
  }

  return (
    <div className='flex flex-col gap-10 pt-10 border-t'>
      {/* Başlık */}
      <div className='flex justify-between text-base sm:text-2xl px-4 sm:px-0'>
        <Title text1='PERSONALIZED' text2='RECOMMENDATIONS' />
      </div>

      {/* Fotoğraf Yükleme */}
      <div className='flex flex-col items-center gap-4'>
        {selectedImage ? (
          <div className='flex flex-col items-center gap-3'>
            <img src={selectedImage} alt='Uploaded' className='w-40 h-40 object-cover rounded-lg shadow' />
            <p className='text-sm text-gray-600'>Your uploaded photo</p>
          </div>
        ) : (
          <label className='w-full max-w-sm text-center cursor-pointer border border-dashed border-gray-400 rounded-lg px-6 py-12 hover:bg-gray-50 transition'>
            <p className='text-sm text-gray-500 mb-2'>Click to upload a photo</p>
            <input type='file' accept='image/*' className='hidden' onChange={handleImageUpload} />
          </label>
        )}
      </div>

      {/* Önerilenler (AI simülasyonu) */}
      <div className='px-4 sm:px-0'>
        {recommended.length > 0 && (
          <>
            <h3 className='text-xl font-medium mb-4'>Recommended for You</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
              {recommended.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sabit öneriler: Farklı kategorilere göre blok blok */}
      <div className='px-4 sm:px-0 flex flex-col gap-10'>

        {/* T-shirt */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Most Loved T-shirts</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {getFilteredProducts('t-shirt').map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Jackets */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Stylish Jackets</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {getFilteredProducts('jacket').map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Trousers */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Comfortable Trousers</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {getFilteredProducts('trouser').map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Tops */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Everyday Tops</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {getFilteredProducts('top').map((item, index) => (
              <ProductItem key={index} {...item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Recommendation
