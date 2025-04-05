import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { assets, products } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Uniform from './Uniform'
import PuffLoader from "react-spinners/PuffLoader"

import axios from "axios"
const LatestCollection = () => {

  const { allProducts ,getProductsData } = useContext(ShopContext)
  const backendUrl = import.meta.env?.VITE_BACKEND_URL
  const [productData, setProductsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(backendUrl + `/v1/getProducts`).then((response)=>{
      console.log(response?.data)
      setLoading(false)
      setProductsData(response?.data?.data)
    }).catch((error)=>{
      setLoading(false)
      console.log(error?.message)
    })
  }, [])


  return (
    <div className='my-[90px]'>
      <div className='text-center pb-8 text-3xl '>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
      </div>


      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            320: { // For small screens (phones)
              slidesPerView: 2,
              spaceBetween: 10,
              autoplay: true,
            },
            480: { // For slightly larger screens (small tablets)
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: { // For tablets
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: { // For desktops
              slidesPerView: 4,
              spaceBetween: 20,
              autoplay: false, // Disable autoplay on larger screens
            },
          }}d
          autoplay={{ delay: 2000 }}
          >
                     {products?.length === 0 && (
              <div className="flex w-full flex-col justify-center items-center">
                <img src={assets.noluggage} alt="" className="w-32" />
                <p className="text-[20px] font-light text-gray-400 w-[300px] text-center">There are no luggages available at the moment! 😢 </p>
              </div>
            )}
          
          {loading ? <PuffLoader color='white' size={20}/> :products?.slice(0, 5)?.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem key={index} out_of_stock={item?.totalStock} id={item._id} description={item.description} product_color={item?.color} image={item.image} name={item.name} newPrice={item.salesprice} oldPrice={item.regularprice} />
            </SwiperSlide>
            ))}
        </Swiper>
        {/* <div className="custom-prev custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135]  p-1 rounded-full -left-2 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30  p-1 rounded-full -right-2 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default LatestCollection