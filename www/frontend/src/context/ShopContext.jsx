import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const cartCounts = JSON.parse(localStorage.getItem("cart"));
  const currency = "Rs.";
  const delivery_fee = 250;
  // const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [allProducts, setAllProducts] = useState();
  const [category, setCategory] = useState([
    "Automatic",
    "Casual",
    "Formal",
    "Luxury",
    "Quartz"
  ]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();


  // Fetching all products from databse

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/v1/getProducts");

      setAllProducts(response.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.message)
    }
  };

  const addToCart = (itemId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const find = cart?.find((d) => d?._id === itemId?._id);
    if (find) {
      toast("Product is available in the cart");
    } else {
      cart.push(itemId);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Item added to cart successfully!");
    }
  };

  useEffect(() => {
  }, [cartItems]);

  const getCartCount = () => {
    return cartCounts?.length;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/update",
            { itemId, size, quantity },
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          // toast.error(error.message)
        }
      }
    } else {
      console.error(
        `Item ${itemId} with size ${size} does not exist in the cart`
      );
    }
  };

  // const getUserCart = async ({token})=> {
  //   try {
  //       const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
  //       if(response.data.success){
  //         setCartItems(response.data.cartData)
  //       }
  //   } catch (error) {
  //     console.log(error)
  //         // toast.error(error.message)
  //   }
  // }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) {
        console.error(`Product with id ${items} not found`);
        continue;
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(
            `Error calculating cart amount for item ${item}`,
            error
          );
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      // getUserCart(localStorage.getItem('token'))
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    allProducts,
    getProductsData,
    setAllProducts,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    category,
    setCategory,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
