import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets, products } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import LoadingSpinner from "../components/LoadingSpinner";
import Axios from "axios";

const Collection = () => {
  const { search, showSearch, backendUrl } = useContext(ShopContext);

  // States for product data and UI control
  // const [products, setProducts] = useState([]); // All products
  const [filterProducts, setFilterProducts] = useState([]); // Filtered products
  const [pageProducts, setPageProducts] = useState([]); // Loaded products for infinite scroll
  const [category, setCategory] = useState([]); // Categories filter
  const [subCategory, setSubCategory] = useState([]); // Subcategories filter
  const [sortType, setSortType] = useState("relevant"); // Sort type
  const [isLoading, setIsLoading] = useState(false); // Loading state for API fetch and scroll
  const [hasMore, setHasMore] = useState(true); // Infinite scroll check
  const [showFilter, setShowFilter] = useState(true); // Show/hide filter panel
  const loaderRef = useRef(null); // Reference for infinite scroll loader

  // Helper functions for category and subcategory toggle
  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory((prev) =>
      prev?.includes(value)
        ? prev?.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Fetch products on initial mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get(
          `${import.meta.env?.VITE_BACKEND_URL}/v1/getProducts`
        );
        // setProducts(response?.data?.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
                setIsLoading(false);

      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add new products to pageProducts state for infinite scroll
  useEffect(() => {
    if (products.length > 0) {
      setPageProducts((prevProducts) => {
        const combinedProducts = [...prevProducts, ...products];
        const uniqueProducts = Array.from(
          new Set(combinedProducts.map((a) => a._id))
        ).map((id) => combinedProducts.find((a) => a._id === id));
        return uniqueProducts;
      });
    }
  }, [products]);

  // Apply filters and sorting to products
  const applyFilter = () => {
    let filtered = [...pageProducts];

    // Filter by search term
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected categories
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Filter by selected subcategories
    if (subCategory?.length > 0) {
      filtered = filtered.filter((item) =>{

        console.log(item?.subCategory)
        subCategory?.includes(item.subCategory)
      }
      );
    }

    // Apply sorting
    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a?.salesprice - b?.salesprice);
        break;
      case "high-low":
        filtered.sort((a, b) => b?.salesprice - a?.salesprice);
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  };

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setHasMore(false); // Prevent additional fetching until more products are available
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    // Clean up observer on unmount
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  // Trigger filter application when any filter state changes
  useEffect(() => {
    applyFilter();
  }, [pageProducts, category, subCategory, search, showSearch, sortType]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100">
          <div className="relative w-72 h-72">
            <img
              src={assets.ticazlogo}
              alt="Logo"
              className="w-full h-full object-contain animate-fade-in "
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col pt-[125px] px-6  sm:flex-row gap-1 sm:gap-10 pb-[40px] border-t max-w-[1280px] mx-auto">
          {/* Filter Options */}
          <div className="min-w-60">
            <p
              onClick={() => setShowFilter((prev) => !prev)}
              className="my-2 text-xl flex items-center cursor-pointer gap-2"
            >
              FILTERS
              <img
                src={assets.dropdown_icon}
                className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                alt="Dropdown Icon"
              />
            </p>
            {/* Category Filter */}
            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="men"
                    onChange={toggleCategory}
                  />
                  Men
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="women"
                    onChange={toggleCategory}
                  />
                  Women
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="kids"
                    onChange={toggleCategory}
                  />
                  Kids
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="unisex"
                    onChange={toggleCategory}
                  />
                  Unisex
                </p>
              </div>
            </div>
            {/* SubCategory Filter */}
            {/* <div
              className={`border border-gray-300 pl-5 py-3 my-5 ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="mb-3 text-sm font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Chain"
                    onChange={toggleSubCategory}
                  />
                  Bags
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Strap"
                    onChange={toggleSubCategory}
                  />
                  Luggage
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Strap"
                    onChange={toggleSubCategory}
                  />
                  Duffle Luggages
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Automatic"
                    onChange={toggleSubCategory}
                  />
                  Carry On
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value="Quartz"
                    onChange={toggleSubCategory}
                  />
                  Bag Packs
                </p>
              </div>
            </div> */}
          </div>

          {/* Right Side (Products) */}
          <div className="flex-1">
            <div className="flex flex-col pb-5 lg:pb-0 lg:flex-row justify-between items-center text-base sm:text-2xl mb-4">
              <Title text1="ALL" text2="COLLECTIONS" />
              {/* Product Sort */}
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="outline-none border-gray-300 text-sm border p-1 h-8"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Map Products */}
            {products?.length === 0 && (
              <div className="flex w-full flex-col justify-center items-center">
                <img src={assets.noluggage} alt="" className="w-32" />
                <p className="text-[20px] text-gray-400 w-[300px] font-light text-center">There are no luggages available at the momment! 😢</p>
              </div>
            )}
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.length > 0 &&
                filterProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    name={item.name}
                    description={item.description}
                    newPrice={item.salesprice}
                    oldPrice={item.regularprice}
                    id={item.name?.toLowerCase().replace(/ /g, "-")}
                    image={item.image}
                    size={item.sizes}
                    product_color={item?.color}
                    out_of_stock={item?.totalStock}
                  />
                ))}
            </div>

            {/* Infinite Scroll Loader */}
            {/* {hasMore && (
          <div ref={loaderRef} className="w-full flex justify-center my-6">
            <LoadingSpinner />
          </div>
        )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
