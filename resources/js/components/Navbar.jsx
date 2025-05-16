import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from '@inertiajs/react'
import { ShopContext } from '../context/ShopContext'
import { useShopContext } from '../context/ShopContext'

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, cartItems, auth } = useShopContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const itemCount = Object.keys(cartItems || {}).length;

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link href={route('home')}><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <Link href={route('home')} className='flex flex-col items-center gap-1'><p>HOME</p></Link>
        <Link href={route('collection')} className='flex flex-col items-center gap-1'><p>COLLECTION</p></Link>
        <Link href={route('about')} className='flex flex-col items-center gap-1'><p>ABOUT</p></Link>
        <Link href={route('contact')} className='flex flex-col items-center gap-1'><p>CONTACT</p></Link>
        <Link href={route('recommendation')} className='flex flex-col items-center gap-1'><p>RECOMMENDATION</p></Link>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" onClick={() => setShowSearch(true)} />
        <Link href={route('cart.basket')} className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          {itemCount > 0 && (
            <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {itemCount}
            </p>
          )}
        </Link>

        {auth?.user ? (
          <Link
            href={route('logout')}
            method='post'
            as='button'
            className='text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition'
          >
            Logout
          </Link>
        ) : (
          <div className='flex items-center gap-4'>
            <Link
              href={route('login')}
              className='text-sm hover:text-gray-600'
            >
              Login
            </Link>
            <Link
              href={route('register')}
              className='text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition'
            >
              Register
            </Link>
          </div>
        )}

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ${visible ? 'w-64 shadow-lg' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} />
            <p>Back</p>
          </div>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href={route('home')}>HOME</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href={route('collection')}>COLLECTION</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href={route('about')}>ABOUT</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href={route('contact')}>CONTACT</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href={route('recommendation')}>RECOMMENDATION</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
