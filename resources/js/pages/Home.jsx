import React from 'react'
import { Hero } from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import AppLayout from '../layouts/AppLayout'

export const Home = () => {
  return (
    <AppLayout>
        <Hero />
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsletterBox/>
    </AppLayout>
  )
}

export default Home;
