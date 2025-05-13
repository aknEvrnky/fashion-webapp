import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'> 
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-lg'>
            <b>Fashion TRIC</b><br/>
            Tric is your go-to webpage for the latest fashion tricks, offering creative styling tips, trend insights, and personalized outfit recommendations through our smart recommendation system!
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Designed for Expression</b>
          <p>Every piece is a reflection of identity — made to express who you are without saying a word.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Effortless Style</b>
          <p>Clean lines, street-ready comfort, and a neutral palette — always wearable, never boring.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>A Brand that Sees You</b>
          <p className='text-gray-600'>We design for all — no rules, no stereotypes. Tric is here to support your individuality, every step of the way.</p>
        </div>
      </div>    
    </div>
  );
};

export default About;
