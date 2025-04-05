import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import RelatedProducts from "../components/RelatedProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import LoadingLogo from "../components/LoadingLogo";
import { assets, products } from "../assets/assets";
import Axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import ServiceSection from "../components/ServiceSection";
import { FaExclamationCircle } from "react-icons/fa";

const Product = () => {
  const { productId } = useParams();
  const locationn = useLocation();
  const { currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const pathnamee = new URLSearchParams(location.search);
  const color = pathnamee.get("color");
  // const [productData, setProductData] = useState()
  // console.log(productData)


  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios.get(
  //       `${
  //         import.meta.env?.VITE_BACKEND_URL
  //       }/v1/products?name=${productId.replace(/-/g, " ")}&color=${color}`
  //     );

  //     setProducts(response?.data || []);
  //     setProductData(response?.data?.[0] || []);

  //     setLoading(false);
  //   } catch (error) {
  //     if (error) {
  //       toast.error(error?.response?.data?.message);
  //       setLoading(false);
  //     }
  //   }
  // };
  const productData = useMemo(
    () =>
      products.find(
        (item) => item?.name?.toLowerCase().replace(/ /g, "-") === productId
      ),
    [productId, products, loading]
  );



  // useEffect(() => {
  //   fetchProducts();
  // }, [productId, color]);
  

  // Memoized product data

  useEffect(() => {
    if (products) {
      setImage(productData?.image[0]);
    }
  }, [products]);
 

  return (
    <>
    
      {loading ? (
        <LoadingLogo />
      ) : (
        <>
         
        <div className="pt-[125px] transition-opacity ease-in duration-500 opacity-100 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product Details */}
          <p className="text-center text-gray-400 font-light text-[17px] py-4">
            Home / Shop /{" "}
            <span className="text-[#015c40] capitalize font-light">
              {productId}
            </span>
          </p>
          <div className="flex flex-col pb-10 sm:flex-row sm:gap-12 gap-8">
            {/* Product Images */}
            <div className="flex-1 flex flex-col gap-3 sm:flex-row md:flex-row md:justify-start md:items-start lg:flex-row lg:justify-start lg:items-start">
              {/* Thumbnails */}
              <div className="sm:flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] lg:w-[80px] lg:h-full flex gap-4 lg:mr-2">
                {productData?.image?.map((item, index) => (
                  <LazyLoadImage
                    key={index}
                    onClick={() => setImage(item)}
                    src={item}
                    className="w-24 sm:w-full sm:h-24 aspect-square lg:w-full lg:h-full cursor-pointer border border-gray-300 hover:opacity-80 transition-opacity rounded object-cover"
                    alt={`Thumbnail ${index + 1}`}
                    effect="blur"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="sm:w-[80%] lg:w-full flex items-center justify-center">
                <div className="relative aspect-square lg:w-[50vw] md:w-full w-full border border-gray-200 rounded overflow-hidden">
                {productData?.totalStock === "0" && <img src="https://static.vecteezy.com/system/resources/previews/002/191/994/non_2x/sorry-temporarily-out-of-stock-sign-vector.jpg" alt='' className='absolute w-[70px] h-[70px] z-[9] rounded-full m-2'/>}
                  <LazyLoadImage
                    src={image}
                    className="w-full h-full object-cover"
                    alt="Selected Product"
                    effect="blur"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 gap-20">
              <p className="text-gray-400 font-medium">Ticaz - Luggage</p>
              <h1 className="font-normal text-3xl">{productData?.name}</h1>
              <div className="flex  mt-2">
                <div className="flex items-center">
                  <div className="flex mb-2 items-center gap-1">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <FaStar color="#004085" key={index} size={25} />
                    ))}
                    <FaStarHalfAlt color="#004085" size={25} />
                  </div>
                  <p className="pl-2 text-gray-400 text-[15px] font-medium">
                    (122)
                  </p>
                  <p className="pl-2 text-gray-600 text-[13px] underline font-light">
                    127 Reviews
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-2 mt-2">
                <p className="text-xl font-medium">
                  ₦{new Intl.NumberFormat().format(productData?.salesprice)}
                </p>
                <span className="text-[14px] line-through font-light">
                  ₦{new Intl.NumberFormat().format(productData?.regularprice)}
                </span>
                <span className="text-[13px] text-red-500 font-normal">
                  ₦43% off
                </span>
              </div>
              <p className="text-[14px] font-normal italic text-gray-300">
                Tax included{" "}
                <span className="text-black font-medium cursor-pointer">
                  . Shipping
                </span>{" "}
                calculated at checkout
              </p>
              <p className="mt-4 italic font-light -tracking-normal text-gray-500 md:w-4/5">
                {productData?.description}
              </p>

              {productData?.othercolors?.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-[17px] font-light">
                    Select colors
                  </p>
                  <div className="flex gap-2 mt-2 cursor-pointer">
                    {productData?.othercolors?.map((item, index) => (
                      <div
                        onClick={() => {
                          navigate(`/shop/${productId}?color=${item}`);
                          // location.reload()
                        }}
                        key={index}
                        style={{ backgroundColor: item }}
                        className="h-[30px] rounded-full border border-gray-200 w-[30px]"
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              <button
              disabled={productData?.totalStock === "0"  ? "disabled":""}
                onClick={() => addToCart(productData, size)}
                className={`font-normal animate-bounce text-black px-8 py-3 mt-6 lg:w-[40%] text-sm border ${productData?.totalStock === "0"  ? "cursor-not-allowed":"cursor-pointer"} border-gray-800 transition-colors`}
              >
                ADD TO BAG
              </button>

              <hr className="mt-8" />
              <div className="text-sm flex flex-col gap-2 text-[#004085] font-light mt-4">
                <p>100% Original product.</p>
                <p>Cash on delivery is not available on this product.</p>
                <p>Easy return and exchange policy within 4 days.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-20">
            <div className="flex">
              <b
                className="border-y border-l px-5 border-b-0 py-3 text-sm cursor-pointer"
                onClick={() => setShow(false)}
                style={{
                  backgroundColor: show ? "" : "green",
                  color: show ? "" : "white"
                }}
              >
                Features{" "}
              </b>
              <p
                className="border-t border px-5 py-3 text-sm cursor-pointer"
                onClick={() => setShow(true)}
                style={{
                  backgroundColor: show ? "green" : "",
                  color: show ? "white" : ""
                }}
              >
                Description
              </p>
            </div>
            {show ? (
              <div className="border px-6 py-6 text-[17px] font-light text-gray-500 flex flex-col gap-4">
                <p>{productData?.description}</p>
              </div>
            ) : (
              <div className="border px-6 py-6 flex flex-col gap-4">
                <ul className="list-disc pl-3">
                  {productData?.features?.length === 0 ? (
                    <p className="flex items-center gap-2 justify-center font-light">
                      <FaExclamationCircle size={25} color="red" /> Sorry there
                      are no features added to this product at the momment !
                    </p>
                  ) : (
                    productData?.features?.map((d, i) => (
                      <li
                        key={i}
                        className="text-black text-[17px] pb-2 font-light"
                      >
                        {d}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Product Description and Reviews */}
          <RelatedProducts
            category={productData?.category}
            subCategory={productData?.subCategory}
          />

          <ServiceSection />

          {/* Related Products */}
        </div>
        {products?.length === 0  && (
            <div className="flex flex-col h-[100vh] pb-10 items-center justify-center">
              <img
                src={assets.noluggage}
                alt=""
                className="w-[250px] animate-bounce "
              />
              <p className="font-light text-[20px] text-gray-500">
                Luggage is not available at the moment!
              </p>
              <span className="font-light text-[18px] text-gray-500">Please checkout other colors or luggages. 😊</span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Product;
