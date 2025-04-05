import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets, products } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Axios from "axios";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import LabelinputLayout from "../layout/LabelinputLayout";
import Select from "react-select";
import LabelinputLayout2 from "../layout/LabelinputLayout2";
import toast from "react-hot-toast";
import CheckoutLoader from "../components/CheckoutLoader";
import Relogin from "../components/Relogin";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { useLocation } from "react-router-dom";
const Cart = () => {
  const [localgovt, setLocalgovt] = useState();
  const [quantities, setQuantities] = useState({});
  const [currentQuantities, setcurrentQuantities] = useState();
  // const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [relogin, setRelogin] = useState(false);
  const [state, setState] = useState();
  const [subtotal, setSubtotal] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [checkoutloader, setCheckoutLoader] = useState(false);
  const [createOrders, setCreateOrders] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    alternativeNumber: "",
    additionalNote: "",
    emailAddress: "",
    deliveryAddress: {
      homeAddress: "",
      state: "",
      localgovt: ""
      // country: ""
    },
    orderItems: [
      {
        name: "",
        qty: "",
        image: "",
        price: "",
        product: ""
      }
    ],
    deliveryPrice: "",
    totalPrice: totalPrice
  });
  const token = localStorage.getItem("token");
  const pathname = new URLSearchParams(location.search);
  const referenceNumber = pathname.get("reference");
  const [verified, setVerified] = useState(false)

  const [cartData, setCartData] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []; // If there's data in localStorage, use it, else default to empty array
  });
  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value
    }));
    const updatedCart = cartData.filter((item) => item._id !== itemId);
  };

  useEffect(() => {
    Axios.get(`https://nga-states-lga.onrender.com/fetch`).then((response) => {
      setState(response?.data);
    });
  }, []);

  const getState = state?.map((d) => ({
    value: d,
    label: d
  }));
  const getLocalGovt = localgovt?.map((d) => ({
    value: d,
    label: d
  }));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env?.VITE_BACKEND_URL}/v1/getProducts`
        );
        setProducts(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  function HandleState(options) {
    Axios.get(
      `https://nga-states-lga.onrender.com/?state=${options?.value}`
    ).then((response) => {
      setLocalgovt(response?.data);
    });
    setCreateOrders((prev) => {
      return {
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          state: options?.value
        }
      };
    });
  }

  useEffect(() => {
    // Whenever cartData changes, update localStorage
    if (cartData.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      localStorage.removeItem("cart"); // Remove the cart from localStorage if it's empty
    }
  }, [cartData]);

  useEffect(() => {
    // Calculate the total price of the products
    const totalSum = cartData?.reduce((acc, item) => {
      const productData = products?.find((product) => product._id === item._id);
      const currentQuantity = quantities[item._id] || item.quantity || 1;
      setcurrentQuantities(currentQuantity);

      const itemPrice = parseFloat(productData?.salesprice) || 0; // Ensure price is a valid number
      const itemTotalPrice = itemPrice * currentQuantity; // Multiply by quantity

      return acc + itemTotalPrice;
    }, 0);

    // Ensure that deliveryPrice is a valid number (parsed as float here)
    const parsedDeliveryPrice = deliveryPrice || 0; // Default to 0 if invalid

    // Calculate the final total sum
    const allPrice = parseInt(totalSum) + parseInt(parsedDeliveryPrice);

    // Round to avoid any floating-point precision issues
    const roundedTotalPrice = Math.round(allPrice * 100) / 100;
    // Format the total price with commas for display (after calculation)
    const formattedTotalPrice = roundedTotalPrice.toLocaleString();

    // Set the total price with formatting
    setTotalPrice(formattedTotalPrice); // Only format for display here
    setCreateOrders((prev) => {
      return { ...prev, totalPrice: roundedTotalPrice };
    });
    setSubtotal(totalSum.toLocaleString()); // Set subtotal formatted for display
  }, [cartData, products, quantities, deliveryPrice]);

  const handleIncreaseQuantity = (itemId, currentQuantity) => {
    // Increment the quantity by 1
    const newQuantity = currentQuantity + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: windowWidth < 600 ? "40px" : "40px",
      padding: "0px"
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
    option: (provided) => ({
      ...provided,
      padding: windowWidth < 600 ? "8px" : "10px"
    }),
    singleValue: (provided) => ({
      ...provided,
      padding: ""
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "",
      fontSize: windowWidth < 600 ? "15px" : "",
      width: windowWidth < 600 ? "100%" : ""
    })
  };

  const removeFromCart = (itemId) => {
    // Remove the item from the cart data
    const updatedCartData = cartData.filter((item) => item._id !== itemId);
    setCartData(updatedCartData); // Update the state

    // Also update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };


  
  // Handle order checkout and create the order in the backend
  const handleProceedToCheckout = async () => {
    if (!token) {
      toast.error("You need to be logged in to make a purchase!");
      setTimeout(() => setRelogin(true), 1500);
      return;
    }

    // Validate required fields for creating an order
    if (
      !createOrders.firstName ||
      !createOrders.lastName ||
      !createOrders.phoneNumber ||
      !createOrders.alternativeNumber ||
      !createOrders.emailAddress ||
      !createOrders.orderItems ||
      !createOrders.deliveryPrice ||
      !createOrders.totalPrice
    ) {
      toast.error("All fields are required to proceed with this order!");
      setCheckoutLoader(false);
      return;
    }

    // Prepare cart data with quantities
    const cartWithQuantities = cartData.map((item) => {
      const currentQuantity = quantities[item._id] || item.quantity || 1;
      return {
        name: item.name,
        qty: currentQuantity.toString(),
        image: item.image[0],
        price: item.salesprice,
        product: item._id
      };
    });

    const callbackUrl = `${window.location.origin}/cart`;
    setCreateOrders((prev) => ({
      ...prev,
      orderItems: cartWithQuantities,
      callback_url: callbackUrl
    }));

    try {
      setCheckoutLoader(true);

      const response = await fetch(
        `${import.meta.env?.VITE_BACKEND_URL}/v1/createOrders`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(createOrders)
        }
      );

      const server = await response.json();

      if (server?.status) {
        toast.success(server?.message);
        localStorage.setItem("verify", true);
        localStorage.removeItem("cart")
        window.location.href = server?.payment_url;
      } else {
        toast.error(server?.message);
        setCheckoutLoader(false);
      }

      if (response?.status === 401) {
        toast.error("Your session expired. Please log in again.");
        setCheckoutLoader(false);
        setCheckoutLoader(false);
        setTimeout(() => {
          setRelogin(true);
        }, 1500);
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setCheckoutLoader(false);
      toast.error("An error occurred during checkout.");
      setCheckoutLoader(false);
    }
  };
  const verify = localStorage.getItem("verify");

  useEffect(() => {
    if (verify) {
      try {
        setCheckoutLoader(true);

        Axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/v1/api/paystack/callback/${referenceNumber}`
        ).then((response) => {
          if (response?.data?.status === "success") {
            setVerified(true)
            toast.success(response?.data?.message);
            localStorage.removeItem("verify");
            
            setTimeout(() => {
              setVerified(false)
            setCheckoutLoader(false);
              }, 5000);
            return;
          } else {
            localStorage.removeItem("verify");
            setCheckoutLoader(false);
          }
        });
      } catch (error) {
        localStorage.removeItem("verify");
        console.log(error);
        setCheckoutLoader(false);
      }
    }
  }, [referenceNumber]);

  useEffect(() => {}, [createOrders]);

  const deliveryMethod = [
    {
      address: "LAGOS (MAINLAND)",
      price: "5000"
    },
    {
      address: "INTER-STATE (Nigeria)",
      price: "10000"
    },
    {
      address: "LAGOS (ISLAND)",
      price: "6000"
    }
  ];
  return (
    <CartStyle>
      {checkoutloader && (
        <CheckoutLoader verified={verified} LoaderTitle="Processing Payment...."  verifiedTitle="Payment Successfull"/>
      )}
      {relogin && <Relogin closeRelogin={setRelogin} />}
      <div className="pt-[120px] bg-gray-100 h-full">
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="text-2xl mb-3">
            <Title text1={"YOUR"} text2={"CART"} lenght={cartData.length}/>
          </div>

          <div className="gridout">
            <div className="flex flex-col overflow-hidden overflow-y-scroll h-[200px] mb-10 md:mb-0 md:h-[280px] lg:h-[478px] gap-3">
              {cartData?.length > 0 ? (
                cartData.map((item, index) => {
                  const productData = products?.find(
                    (product) => product._id === item._id
                  );
                  const currentQuantity =
                    quantities[item?._id] || item.quantity || 1;
                  const itemPrice = parseFloat(productData?.salesprice); // Remove commas if necessary
                  const totalPrice = itemPrice * currentQuantity;
                  return (
                      <div key={index} className="flex gap-6 bg-white border p-3 rounded-lg">
                        <img
                          src={productData?.image[0]}
                          className=" w-28 h-28 lg:h-[207px] lg:w-[250px] md:w-[250px]"
                          alt=""
                        />
                        <div className="flex flex-col w-full justify-between">
                          <div className="flex justify-between">
                            <p className="text-[13px] lg:text-[18px] uppercase w-full sm:text-lg font-medium">
                              {productData?.name}
                            </p>
                            <RxCross2
                              size={25}
                              onClick={() => removeFromCart(item._id)}
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="py-3">
                            <p className="font-medium ">Color</p>
                            <p className="font-light ">{productData?.color}</p>
                          </div>
                          <p className="text-[#2c62d8] text-[16px] cursor-pointer">
                            Personalize it
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="border p-1 md:p-2 lg:p-2 rounded-md flex justify-center">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item._id,
                                    currentQuantity - 1
                                  )
                                }
                                disabled={currentQuantity <= 1}
                              >
                                <FaMinus size={14} />
                              </button>
                              <input
                                value={currentQuantity}
                                disabled
                                onChange={(e) =>
                                  handleQuantityChange(item._id, e.target.value)
                                }
                                className="w-8 lg:w-14 mx-3 border-l  border-r border-gray-500 bg-transparent text-center outline-none"
                                type="number"
                                min={1}
                              />
                              <button
                                onClick={() =>
                                  handleIncreaseQuantity(
                                    item._id,
                                    currentQuantity
                                  )
                                }
                              >
                                <FaPlus size={14} />
                              </button>
                            </div>
                            <div className="flex text-[15px] lg:text-[18px] items-center gap-5 mt-2">
                              <p>
                                NGN{" "}
                                {new Intl.NumberFormat().format(
                                  productData?.salesprice * currentQuantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                   
                  );
                })
              ) : (
                <div className="py-9 flex flex-col gap-2  items-center justify-center">
                  <p className="text-2xl font-light text-gray-400">Your cart is currently empty 😔</p>
                  <div className="w-[100px] h-[2px] rounded-full bg-gray-500"></div>
                </div>
              )}
            </div>
         
            <div>
              <div className="bg-white w-full md:h-[478px] lg:h-[478px] overflow-hidden overflow-y-scroll p-3">
                <div className="flex flex-col gap-2">
                  <div className="labelstyle">
                    <LabelinputLayout
                      placeholder="Enter first name"
                      label="First name"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return { ...prev, firstName: e.target?.value };
                        });
                      }}
                    />
                    <LabelinputLayout
                      placeholder="Enter last name"
                      label="Last name"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return { ...prev, lastName: e.target?.value };
                        });
                      }}
                    />
                  </div>
                  <div className="labelstyle">
                    <LabelinputLayout
                      placeholder="Enter Phonenumber"
                      label="Enter Phonenumber"
                      type="number"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return { ...prev, phoneNumber: e.target?.value };
                        });
                      }}
                    />
                    <LabelinputLayout
                      placeholder="Enter alternative phonenumber"
                      label="Enter Alternative phonenumber"
                      type="number"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return {
                            ...prev,
                            alternativeNumber: e.target?.value
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="labelstyle">
                    <LabelinputLayout
                      placeholder="Enter email address"
                      label="Enter Email Address"
                      type="email"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return { ...prev, emailAddress: e.target?.value };
                        });
                      }}
                    />
                    <LabelinputLayout
                      placeholder="Enter Home Address"
                      label="Enter Home Address"
                      onChange={(e) => {
                        setCreateOrders((prev) => {
                          return {
                            ...prev,
                            deliveryAddress: {
                              ...prev.deliveryAddress,
                              homeAddress: e?.target?.value
                            }
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="selectstyle">
                    <div className="label">
                      <label>State</label>
                      <Select
                        onChange={(options) => HandleState(options)}
                        options={getState}
                        styles={customStyles}
                      />
                    </div>
                    <div className="label">
                      <label>City</label>
                      <Select
                        onChange={(options) => {
                          setCreateOrders((prev) => {
                            return {
                              ...prev,
                              deliveryAddress: {
                                ...prev.deliveryAddress,
                                localgovt: options?.value
                              }
                            };
                          });
                        }}
                        options={getLocalGovt}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <LabelinputLayout2
                    label="Additional Note"
                    placeholder="what else do you want to add"
                    onChange={(e) => {
                      setCreateOrders((prev) => {
                        return { ...prev, additionalNote: e.target?.value };
                      });
                    }}
                  />
                </div>
                <p className="text-[22px] font-medium py-4">
                  Delivery Method/AMOUNT
                </p>
                {deliveryMethod?.map((d, i) => {
                  return (
                    <div
                      key={i}
                      className="flex border-b py-3 justify-between items-baseline"
                    >
                      <div className="flex gap-3 items-baseline justify-between">
                        <label
                          htmlFor={`option-${i}`}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            // onChange={() => handleRadioChange(d)}
                            type="radio"
                            name="group"
                            className="hidden peer"
                            id={`option-${i}`}
                            onChange={(e) => {
                              setDeliveryPrice(d?.price);
                              setCreateOrders((prev) => {
                                return { ...prev, deliveryPrice: d?.price };
                              });
                            }}
                          />
                          <span className="w-6 h-6 border-4 border-green-300 rounded-full bg-white peer-checked:bg-green-400 peer-checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"></span>
                        </label>

                        <p className="text-[20px] font-light">{d?.address}</p>
                      </div>
                      <p>₦{d.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal
                totalPrice={totalPrice}
                deliveryPrice={deliveryPrice}
                subtotal={subtotal}
              />
              <div className="w-full text-end">
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-green-600 rounded-sm text-white text-md my-8 px-8 py-4"
                >
                  CHEKOUT NOW!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartStyle>
  );
};

export default Cart;
const CartStyle = styled.div`
  .label label {
    color: #344054;
    line-height: 20px;
    font-size: 13px;
    font-weight: 500;
  }
  .gridout {
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 20px;
    @media screen and (max-width:1034px) {
      grid-template-columns: auto;
      /* margin-right: 30px; */
    }
 
  }
  .labelstyle {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    @media screen and (max-width:500px){
      grid-template-columns:auto ;
    }

  }
  .selectstyle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

  }
`;
