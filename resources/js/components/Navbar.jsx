import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from '@inertiajs/react'
import { ShopContext } from '../context/ShopContext'

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link href='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <Link href='/' className='flex flex-col items-center gap-1'><p>HOME</p></Link>
        <Link href='/collection' className='flex flex-col items-center gap-1'><p>COLLECTION</p></Link>
        <Link href='/about' className='flex flex-col items-center gap-1'><p>ABOUT</p></Link>
        <Link href='/contact' className='flex flex-col items-center gap-1'><p>CONTACT</p></Link>
        <Link href='/recommendation' className='flex flex-col items-center gap-1'><p>RECOMMENDATION</p></Link>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" onClick={() => setShowSearch(true)} />
        <div className='group relative'>
          <img className='w-5 cursor-pointer' src={assets.profile_icon} />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <Link href='/profile' className='hover:text-black'>My Profile</Link>
              <Link href='/orders' className='hover:text-black'>Orders</Link>
              <p className='cursor-pointer hover:text-black' onClick={() => {
                localStorage.removeItem('auth-token');
                localStorage.removeItem('user-info');
                window.location.reload();
              }}>Logout</p>
            </div>
          </div>
        </div>

        <Link href='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ${visible ? 'w-64 shadow-lg' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} />
            <p>Back</p>
          </div>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href='/'>HOME</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href='/collection'>COLLECTION</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href='/about'>ABOUT</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href='/contact'>CONTACT</Link>
          <Link onClick={() => setVisible(false)} className='py-2 pl-6 border' href='/recommendation'>RECOMMENDATION</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
