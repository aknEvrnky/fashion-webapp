import React from 'react'
import { assets } from '../assets/assets'
import { Link } from '@inertiajs/react'

const Footer = () => {
  return (
    <div className="mt-40 px-4">
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-14 text-sm">
        
        {/* Logo */}
        <div className="text-left">
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover the best in modern fashion. Style that speaks for you.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link href="/" className="hover:text-black">Home</Link></li>
            <li><Link href="/about" className="hover:text-black">About Us</Link></li>
            <li><Link href="/collection" className="hover:text-black">Collection</Link></li>
            <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+90 (212) 345 67 89 </li>
            <li>support@tricwear.com</li>
          </ul>
        </div>
      </div>

      {/* Alt Çizgi */}
      <div className="mt-10">
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 tric.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
