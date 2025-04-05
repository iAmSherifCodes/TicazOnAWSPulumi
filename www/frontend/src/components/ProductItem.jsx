import React, { useContext, memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { assets } from '../assets/assets';

const ProductItem = memo(({ id, description,out_of_stock, product_color,size,price, image, name, newPrice, oldPrice }) => {

  // Hover state
  const [isHovered, setIsHovered] = useState(false);

  // UseMemo to precompute offer percentage
  const offer = useMemo(() => Math.floor(((oldPrice - newPrice) / oldPrice) * 100), [oldPrice, newPrice]);

  // Precompute truncated text
  const shortDescription = useMemo(
    () => (description.length > 60 ? description.slice(0, 60) + '...' : description),
    [description]
  );
  const productName = useMemo(
    () => (name.length > 20 ? name.slice(0, 23) + '...' : name),
    [name]
  );

  // Ensure that we have more than one image before enabling hover effect
  const hasMultipleImages = image && image.length > 1;

  return (
        
    <Link to={`/shop/${name.toLowerCase().replace(/ /g, "-")}?color=${product_color}`}>
      <div
        className="flex relative w-full h-full justify-between flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Offer Label */}
        {offer > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full">
            -{offer}%
          </div>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
          {out_of_stock === "0" && <img src="https://static.vecteezy.com/system/resources/previews/002/191/994/non_2x/sorry-temporarily-out-of-stock-sign-vector.jpg" alt='' className='w-[70px] h-[70px] z-[9999] rounded-full m-2'/>}
          {/* First Image (Default/Always Visible) */}
          <LazyLoadImage
            src={image[0]}
            effect="blur"
            className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${hasMultipleImages && isHovered ? 'opacity-0 scale-100' : 'opacity-100 scale-100'
              }`}
            style={{
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
            alt={name}
          />
          {/* Second Image (Only if hover and multiple images) */}
          {hasMultipleImages && isHovered && (
            <LazyLoadImage
              src={image[1]}
              effect="blur"
              className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                }`}
              style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
              alt={name}
            />
          )}
        </div>




        {/* Product Details */}
        <div className="text-start relative py-2 px-2">
          <p
            className={`absolute hidden duration-200 transition-all z-40 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
              } -top-10 left-0 bg-primary py-2 font-semibold text-sm uppercase w-full text-center`}
          >
            Add to cart
          </p>
          <p className="text-sm tracking-wide font-semibold uppercase mb-1 text-gray-800">{productName}</p>
          {/* <p className="text-[13px] text-gray-500">{shortDescription.slice(0, 30)}.....</p> */}
          <div className="flex gap-2 justify-start items-start mt-1">
           
            <p className="font-light text-[15px]">
              NGN {new Intl.NumberFormat().format(newPrice)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;
