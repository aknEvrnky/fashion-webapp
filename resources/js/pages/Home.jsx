import React from 'react'
import { Hero } from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import AppLayout from '../layouts/AppLayout'
import {Head, usePage} from "@inertiajs/react";

export const Home = () => {
    const latestProducts = usePage().props.latestProducts.data;
    const popularProducts = usePage().props.popularProducts.data;

  return (
    <AppLayout>
      <Head title='Fashion Tric - Home Page'/>

        <Hero />
        <LatestCollection latestProducts={latestProducts} />
        <BestSeller bestProducts={popularProducts} />
        <OurPolicy/>
        <NewsletterBox/>
    </AppLayout>
  )
}

export default Home;
