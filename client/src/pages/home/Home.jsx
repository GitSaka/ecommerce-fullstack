// import React from 'react'
import Hero from '../../components/hero/Hero'
import Category from '../../components/cathegory/Cathegory'
import ProductsSection from '../../components/productlist/Productlist'
import PromoBanner from '../../components/promoanner/PromoBanner'
import FlashSales from '../../components/flashsales/FlashSales'
// import NewArrivalsCarousel from '../../components/newarrivels/NewArrivals'
import NewArrivals from '../../components/newarrivels/NewArrivals'
import Testimonials from '../../components/testimonials/Testimonials'
import Newsletter from '../../components/newsletter/Newsletter'
// import Footer from '../../components/footer/Footer'


export const Home = () => {
  return (
    <div>
    <Hero/>
    <Category/>
    <PromoBanner/>
    <ProductsSection/>
    <FlashSales/>
    <NewArrivals/>
    <Testimonials/>
    <Newsletter/>
    </div>
  )
}
