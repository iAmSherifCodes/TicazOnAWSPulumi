import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CategorySection from './CategoryItem';
import { assets } from '../assets/assets';
import CategoryItem from './CategoryItem';

const Category = () => {

  const { category } = useContext(ShopContext)

  const categories = [
    {
      id: 1,
      title: "Carry Onn",
      image: "https://www.awaytravel.com/cdn/shop/files/56bc0807-2917-4e6b-b85a-56e834508b82_1f08d9c6-dada-48a7-ac07-9c1dec3500bb.jpg?v=1739239854&width=1200",
      link: "/shop/bags",
    },
    {
      id: 2,
      title: "Duffel",
      image: "https://cdn.thewirecutter.com/wp-content/media/2022/10/dufflebags-2048px-2305-1024x683.jpg",
      link: "/shop/luggage",
    },
    {
      id: 3,
      title: "Travel Packs",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnOhTX9oKaZbDLXsNf8kv_w7Cfvv5bKdPdPQ&s",
      link: "/shop/luggage",
    },
    {
      id: 4,
      title: "Leather",
      image: "https://sc04.alicdn.com/kf/H53d8329bb8834d8ba7ad4df10a8b6d1eK.jpg",
      link: "/shop/accessories",
    },
    {
      id: 5,
      title: "BackPack",
      image: "https://www.awaytravel.com/cdn/shop/files/PDP_OutdoorBackpack26L_Mauve_02.jpg?v=1741118357&width=1200",
      link: "/shop/bags",
    },
    {
      id: 6,
      title: "Ladies Bag",
      image: "https://www.lavieworld.com/cdn/shop/articles/c39b09efe9334781f0a52b1832bf5836_1024x1024.jpg?v=1693886031",
      link: "/shop/accessories",
    },
    {
      id: 6,
      title: "CABIN",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNiBHULnxPzs4f9USKw0N4t_3zbA6jrXq11S9_PrgDNN-zWd0Lf_uJ8pHHabwBsAsGKA&usqp=CAU",
      link: "/shop/luggages",
    },
    {
      id: 7,
      title: "CROSS BODY",
      image: "https://m.media-amazon.com/images/I/61VyPSnU-hL._AC_SL1500_.jpg",
      link: "/shop/accessories",
    },
    {
      id: 6,
      title: "Culture Vile",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGBidONWATInmcgHegYSqPDl9Bv0mikESUw&s",
      link: "/shop/accessories",
    },
    {
      id: 6,
      title: "Summer Bags",
      image: "https://media.glamourmagazine.co.uk/photos/6478b990f661e636b3b3effe/16:9/w_2580,c_limit/SUMMER%20BAGS%20010623%20main.jpg",
      link: "/shop/accessories",
    },
  ];

  return (
    <div className="py-12">
      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 2000 }}
                    breakpoints={{
            320: { // For small screens (phones)
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: { // For small tablets
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: { // For medium-sized tablets
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: { // For desktops
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1144: { // For desktops
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
        >
          {
            categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryItem categoryImg={category.image} link={category.link} categoryName={category.title} key={index} />
              </SwiperSlide>
            ))
          }

          {/* Custom Navigation Buttons */}
        </Swiper>
        <div className="custom-prev custom-prev  transition-opacity duration-300 ease-in-out">
          <button className="absolute text-xl z-30 text-[#cba135]  p-1 rounded-full -left-3 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev transition-opacity duration-300 ease-in-out">
          <button className="absolute text-xl z-30  p-1 rounded-full -right-3 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category