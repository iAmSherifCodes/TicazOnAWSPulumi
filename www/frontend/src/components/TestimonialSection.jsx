import React from 'react';
import Title from './Title';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import TestimonialCard from './TestimonialCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const TestimonialSection = () => {
  const feedback = [
    {
      rating:4,
      name:"Rasheed R.",
      header:"Love Them",
      image:"https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-10-13_at_12.22.45_PM.png?width=412&crop=center&v=1728818631",
      description: `"I’ve taken my [luggage] to Paris, San Francisco, New Mexico, Indonesia... I have never traveled more at ease. If there was a rating higher than 10, I’d give it!"`
    },
    {
      rating:5,
      name:"Emmanuel F.",
      header:"High Quality Products",
      image:"https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_5722.jpg?width=412&crop=center&v=1732484942",
      description: `"I love TICAZ! From the thoughtfully created products to the customer service team that seems to go above and beyond, everything is exactly how I’d want it to be"`
    },
    {
      rating:5,
      name:"Taiwo T.",
      header:"Very Impressed",
      image:"https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-06-29_at_11.19.12_PM.png?width=412&crop=center&v=1719696304",
      description: `"I'm extremely impressed with TICAZ LUGGAGE. The designs are trendy and modern, and the quality is exceptional. The best brand in my collection and always my first choice when travelling."`
    },

  ]
  const images = ["https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_0346.jpg?height=454&crop=center&v=1724094171","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_5555.jpg?width=412&crop=center&v=1732484826","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-10-13_at_12.22.45_PM.png?width=412&crop=center&v=1728818631","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_5722.jpg?width=412&crop=center&v=1732484942","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-06-29_at_11.19.12_PM.png?width=412&crop=center&v=1719696304","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_9427.jpg?height=454&crop=center&v=1723927138","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/DSC03057.jpg?height=454&crop=center&v=1723927155"]
  return (
    <div className='mt-32 px-8'>
      <div className="text-center text-3xl pb-8">
        <Title text1={'CUSTOMERS'} text2={'REVIEWS'} />
      </div>

      <div className="bg-black p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 place-items-center">
  <p className='text-white text-[30px] border-b pb-5 lg:pb-4 lg:border-r py-5'>What fellow travelers are saying</p>
     {
      feedback?.map((d, i)=>{
        return(

          <TestimonialCard
          key={i}
          name={d.name}
          desc={d.description}
          rating={d.rating}
          // image={d.image}
          />
        )
      })
     }        
        
      </div>
      <div className='mt-32 w-full overflow-hidden overflow-scroll'>
  <div className='grid w-[100vw] lg:w-full grid-cols-7  overflow-x-auto space-x-4 scrolling-touch'>
    {images?.map((s, i) => (
      <div className='' key={i} >
        <img src={s} alt='img' className='w-full h-full object-cover' />
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default TestimonialSection;
