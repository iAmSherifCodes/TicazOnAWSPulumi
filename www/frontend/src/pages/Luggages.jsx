import React, { useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { Link } from "react-router-dom";
import Axios from "axios";
import LoadingLogo from "../components/LoadingLogo";
import { FaChevronDown } from "react-icons/fa";
import { products } from "../assets/assets";

function Luggage() {
  const [loading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [LuggageColor, setLuggageColor] = useState()
  const categories = [
    {
      name: "COLOR",
      icon: <FaChevronDown />
    },
    {
      name: "MATERIAL",
      icon: <FaChevronDown />
    },
  ];

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await Axios.get(
  //         `${import.meta.env?.VITE_BACKEND_URL}/v1/getProducts`
  //       );
  //       setProducts(response?.data?.data || []);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //               setIsLoading(false);

  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProducts();
 
  // }, []);

    const [selectedFilter, setSelectedFilter] = useState(null);

    const ProductCount = products
    ?.filter((d) => d.subCategory === "luggage")?.length 
  return (
    <>
    {
        loading ? <LoadingLogo /> :
      <div className="pt-[125px] pb-[40px]">
        <h2 className="text-center text-[35px] mb-10 font-light line-through">TRAVEL LUGGAGES</h2>

<div className="mx-10 flex justify-between items-center">

        <div className=" flex cursor-pointer items-center gap-4 my-3">
          {categories?.map((d, i) => {
            return (
              <div key={i} className="flex items-center gap-1" onClick={(e)=>{
                setSelectedCategory(d?.name)
              }}>
                <p>{d?.name}</p>
                <div>{d?.icon}</div>
              </div>
            );
          })}
        </div>
        <p className="text-gray-500 uppercase">{ProductCount} products</p>
</div>

<div className="flex mx-10 my-4 gap-5">
        {products
        ?.filter((d) => d.subCategory === "luggage") 
          ?.filter((item) => {
            // Filter based on selected category
            if (selectedCategory === "COLOR") {
              return item?.color;
            } else if (selectedCategory === "MATERIAL") {
              return item?.material;
            }
            return false; // No filter applied if no category is selected
          })
          ?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center gap-1 border border-gray-300 w-[100px] p-3"
              onClick={() => {
                setSelectedFilter(selectedCategory === "COLOR" ? item?.color : item?.material);
              }}
            >
              <div
                style={{ backgroundColor: item?.color }}
                className="h-[30px] w-[30px] rounded-full"
              ></div>
              <p className="capitalize text-gray-400">{selectedCategory === "COLOR" ? item?.color : item?.material}</p>
            </div>
          ))}
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 mx-10">
          {products
             ?.filter((d) => d.subCategory === "luggage") // Filter by subCategory
             .filter((d) => {
               // Additional filter based on selected color or material
               if (selectedFilter) {
                 if (selectedCategory === "COLOR") {
                   return d?.color === selectedFilter;
                 } else if (selectedCategory === "MATERIAL") {
                   return d?.material === selectedFilter;
                 }
               }
               return true; // If no filter, show all
             })
            .map((d, i) => {
              return (
                <Link
                  to={`/shop/${d?.name
                    .toLowerCase()
                    .replace(/ /g, "-")}?color=${d?.color}`}
                  className="cursor-pointer"
                  key={i}
                >
                                    {d?.totalStock === "0" && <img src="https://static.vecteezy.com/system/resources/previews/002/191/994/non_2x/sorry-temporarily-out-of-stock-sign-vector.jpg" alt='' className='absolute w-[70px] h-[70px] z-[9] rounded-full m-2'/>}

                  <div className="h-[300px] w-[300px]">
                    <img
                      src={d.image[0]}
                      className="w-full h-full"
                      alt={d.name}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[18px] lg:text-[15px] font-normal">
                      {d?.name.toUpperCase()}
                    </p>
                    <p className="text-[14px] font-light">
                      FROM ₦{new Intl.NumberFormat().format(d?.salesprice)}
                    </p>
                    <span className="text-red-500 line-through text-[13px]">
                      {new Intl.NumberFormat().format(d?.regularprice)}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    }
    </>
  );
}

export default Luggage;
