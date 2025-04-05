import React from 'react';
import { assets } from '../assets/assets';
import { Link } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const collections = [
  {
    id: 1,
    title: "Luggage Collection",
    image: "https://shop.samsonite.com/dw/image/v2/BBZB_PRD/on/demandware.static/-/Sites-product-catalog/default/dw3c60fdeb/collections/_samsonite/Maxsum-Eco/500x500/139845-0557-FRONT34.jpg?sw=912&sh=912",
    link: "/shop/luggage",
  },
  {
    id: 2,
    title: "Backpacks Collection",
    image: "https://www.awaytravel.com/cdn/shop/files/PDP_Featherlight_Backpack_Small_Amaro_02.jpg?v=1740691533&width=1200",
    link: "/shop/bags",
  },
  {
    id: 3,
    title: "bags Collection",
    image: "https://www.awaytravel.com/cdn/shop/files/98680929-1145-45c1-87fd-15330d8d154f.jpg?v=1740064129&width=1200",
    link: "/shop/bags",
  },
  {
    id: 4,
    title: "Accessories",
    image: "https://www.awaytravel.com/cdn/shop/files/PDP_Packable_Tote_Orange_01_8b75df93-9e10-4071-a2f8-f0661a6eff5a.jpg?v=1736350660&width=1200",
    link: "/shop/accessories",
  },
];

const CategoryCollection = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {collections.map((collection) => (
        <div key={collection.id} className="overflow-hidden relative group h-96 max-h-96">
          <Link to={collection.link}>
            <div className="relative w-full h-full transform group-hover:scale-110 duration-300 flex items-center justify-center">
              <div className='w-full'>

              <LazyLoadImage
                effect="blur"
                src={collection.image}
                className="w-full h-full object-contain"
                alt={collection.title}
              />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
            </div>


            <div className="absolute flex flex-col items-center justify-center bottom-4 left-[50%] top-[80%] -translate-x-[50%] -translate-y-[50%] text-white w-full">
              <div className='flex items-center mb-4'>
                <h2 className='lg:text-xl text-center lg:text-start text-gray-50 font-medium tracking-widest uppercase'>
                  {collection.title}
                </h2>
                <div className='text-lg text-gray-50 transform translate-x-10 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                  <FaChevronRight />
                </div>
              </div>
              <button className='border py-1 px-3 border-white'>Explore more</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryCollection;
