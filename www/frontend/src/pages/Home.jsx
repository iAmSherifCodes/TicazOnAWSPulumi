import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Category from '../components/Category'
import SignupEmail from '../components/SignupEmail'
import ServiceSection from '../components/ServiceSection'
import CategoryCollection from '../components/CategoryCollection'
import TestimonialSection from '../components/TestimonialSection'
import WhatsAppChat from '../components/WhatsAppChat'
import Uniform from '../components/Uniform'

const Home = () => {

  return (
    <div>

      <Hero />

      <div className='max-w-screen-xl mx-auto px-5'>
        <Category />
        <LatestCollection />
      </div>
      <Uniform/>
      <div>

        <BestSeller />
      </div>

      <CategoryCollection />
      {/* <OurPolicy/> */}
      <TestimonialSection />
      <ServiceSection /> 
      <NewsLetterBox/>
      <WhatsAppChat/>
    </div>
  )
}

export default Home