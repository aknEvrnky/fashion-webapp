import React, {useState, useContext} from 'react'
import {ShopContext} from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import AppLayout from "@/Layouts/AppLayout.jsx";
import {Head, usePage} from "@inertiajs/react";

const Recommendation = () => {
  const tshirtRecommendations = usePage().props.tshirtRecommendations.data;
  const jacketRecommendations = usePage().props.jacketRecommendations.data;
  const trouserRecommendations = usePage().props.trouserRecommendations.data;
  const topRecommendations = usePage().props.topRecommendations.data;

  const [selectedImage, setSelectedImage] = useState(null)
  const [recommended, setRecommended] = useState([])

  // todo: retrieve recommendations from the server
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))

      setRecommended([])
    }
  }

  return (
    <AppLayout>
      <Head title='Recommendations'/>

      <div className='flex flex-col gap-10 pt-10 border-t'>
        {/* Başlık */}
        <div className='flex justify-between text-base sm:text-2xl px-4 sm:px-0'>
          <Title text1='PERSONALIZED' text2='RECOMMENDATIONS'/>
        </div>

        {/* Fotoğraf Yükleme */}
        <div className='flex flex-col items-center gap-4'>
          {selectedImage ? (
            <div className='flex flex-col items-center gap-3'>
              <img src={selectedImage} alt='Uploaded'
                   className='w-40 h-40 object-cover rounded-lg shadow'/>
              <p className='text-sm text-gray-600'>Your uploaded photo</p>
            </div>
          ) : (
            <label
              className='w-full max-w-sm text-center cursor-pointer border border-dashed border-gray-400 rounded-lg px-6 py-12 hover:bg-gray-50 transition'>
              <p className='text-sm text-gray-500 mb-2'>Click to upload a photo</p>
              <input type='file' accept='image/*' className='hidden' onChange={handleImageUpload}/>
            </label>
          )}
        </div>

        {/* Önerilenler (AI simülasyonu) */}
        <div className='px-4 sm:px-0'>
          {recommended.length > 0 && (
            <>
              <h3 className='text-xl font-medium mb-4'>Recommended for You</h3>
              <div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
                {recommended.map((item, index) => (
                  <ProductItem
                    key={index}
                    product={item}
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
              {tshirtRecommendations.map((item, index) => (
                <ProductItem key={index} product={item} />
              ))}
            </div>
          </div>

          {/* Jackets */}
          <div>
            <h3 className='text-xl font-medium mb-4'>Stylish Jackets</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
              {jacketRecommendations.map((item, index) => (
                <ProductItem key={index} product={item} />
              ))}
            </div>
          </div>

          {/* Trousers */}
          <div>
            <h3 className='text-xl font-medium mb-4'>Comfortable Trousers</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
              {trouserRecommendations.map((item, index) => (
                <ProductItem key={index} product={item} />
              ))}
            </div>
          </div>

          {/* Tops */}
          <div>
            <h3 className='text-xl font-medium mb-4'>Everyday Tops</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
              {topRecommendations.map((item, index) => (
                <ProductItem key={index} product={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}

export default Recommendation
