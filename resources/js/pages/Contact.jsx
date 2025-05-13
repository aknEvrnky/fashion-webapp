import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';
import AppLayout from '../layouts/AppLayout';

const Contact = () => {
  return (
    <AppLayout>
      <div>
        <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt='Contact' />

          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>
              Teşvikiye Mahallesi, Abdi İpekçi Caddesi No: 23/A,
              Şişli / Nişantaşı - İstanbul
            </p>
            <p className='text-gray-500'>
              Tel: +90 (212) 345 67 89 <br />
              Email: <a href='mailto:support@tricwear.com' className='underline'>support@tricwear.com</a>
            </p>

            <p className='font-semibold text-xl text-gray-600'>Careers at Tric</p>
            <p className='text-gray-500'>Learn more about our teams and current job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
              Explore Jobs
            </button>

            {/* Sosyal Medya ve Blog Linkleri */}
            <div className="mt-6 space-y-3">
              <p className='font-semibold text-xl text-gray-600'>Connect with us</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://fashiontricofficial.blogspot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
                >
                  Visit Our Blog
                </a>
                <a
                  href="https://www.instagram.com/fashiontric.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@fashion.tric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        <NewsletterBox />
      </div>
    </AppLayout>
  );
};

export default Contact;
