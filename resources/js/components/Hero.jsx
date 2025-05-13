import React from 'react';
import { assets } from '../assets/assets';

export const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row border border-gray-300" data-eye="hero-section">

      {/* Left Side - Text */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6 sm:px-10" data-eye="hero-text-block">
        <div className="text-[#414141] max-w-md">

          {/* Tek ve estetik başlık */}
          <h1 
            className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            data-eye="hero-title"
          >
            It’s your new fashion, Tric.
          </h1>

        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full sm:w-1/2" data-eye="hero-image">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Hero Visual"
        />
      </div>
      
    </section>
  );
};

export default Hero;
