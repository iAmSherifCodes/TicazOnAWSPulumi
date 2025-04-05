import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets } from '../assets/assets';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Aos from "aos"
const Hero = () => {
    useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div className='pt-[90px] md:pt-[86px] lg:pt-[95px] '>

<div className='grid  grid-cols-1 s1000:grid-cols-2 '>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      // navigation={{
      //   prevEl: ".custom-prev",
      //   nextEl: ".custom-next",
      // }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
      className="relative order-2 s1000:order-1 w-full h-[50vh] s1000:h-[75vh] lg:h-[75vh]  overflow-hidden"
    >
          <SwiperSlide className="relative">
       
        <div className='w-full h-full'>

<img src="https://images.ctfassets.net/635jp660g7e4/1REQULoPwbhkTU3oELfpg5/55f7a202e4bfa1908380bef2e72eb310/Mask_group.jpg?fm=webp&q=75&w=1200" alt="Slide 2" className="h-full w-full object-center " />
</div>
        <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-30 text-white p-4 rounded-lg">

        </div>
      </SwiperSlide>
          <SwiperSlide className="relative">
        <div className='w-full h-full'>

        <img src="https://cdn.shopify.com/s/files/1/0802/6498/6927/files/DF1C6711-2A72-41BD-9D33-5F389FDE559B_L0_001-9_26_2024_2_07_53_PM.jpg?width=1350&crop=center&v=1733738932" alt="Slide 1" className="w-full object-center s1000:object-cover h-full" />
        </div>
        <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-30 text-white p-4 rounded-lg">
         
        </div>
      </SwiperSlide>
      

      <SwiperSlide className="relative">
        <div className='w-full h-full'>

        <img src="https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-10-13_at_12.23.03_PM.png?width=2880&crop=center&v=1728818631" alt="Slide 1" className="w-full object-center s1000:object-cover h-full" />
        </div>
        <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-60 text-white p-4 rounded-lg">
     
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
      <div className='w-full h-full'>

<img src="https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Untitled_design_1.png?width=2880&crop=center&v=1732472018" alt="Slide 2" className="h-full w-full object-cover  " />
</div>
        <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-30 text-white p-4 rounded-lg">
       
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
      <div className='w-full h-full'>

<img src="https://images.ctfassets.net/635jp660g7e4/1UAD2C9PiTFRfD4Jb5fOcC/d0be78b073cdad703cf3ebbe2e78e6a7/AITW_January_Ecomm_HP_Shop_by_category_bags.jpg?fm=webp&q=75&w=828" alt="Slide 2" className="h-full w-full object-center s1000:object-cover " />
</div>
        <div className="absolute top-[50%] translate-y-[-50%] left-14   bg-black bg-opacity-30 text-white p-4 rounded-lg">
       
        </div>
      </SwiperSlide>
  
    </Swiper>
    <div  className='bg-[#111111] order-1 s1000:order-2 p-10 s1000:p-0 text-white flex flex-col text-center justify-center items-center '>
<p className='font-lyon text-[36px]' data-aos="zoom-in">An icon for a reason</p>
<h2 className='text-[55px] font-normal' data-aos="zoom-in">THE MINI<br/> CROSSBODY</h2>
<p className='text-[18px] font-light  lg:w-[85%] px-3 lg:px-0 py-5' data-aos="zoom-=in">New year, new bag. The Mini Crossbody is ready for all your 2025 adventures. Apply MINIFORYOU in cart for 40% off and free ground shipping. In stores and online.*</p>
<button className='text-[16px] bg-white font-semibold text-black p-4 px-8 rounded-sm' >SHOP NOW</button>
    </div>
</div>

  <div className='flex justify-center flex-col items-center py-7'>
  <p className='text-[30px] font-light font-lyon'>A few of our</p>
<h2 className='text-[50px]'>FAVOURITES</h2>
  </div>
      </div>
  );
};

export default Hero;
