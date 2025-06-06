import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import axios from 'axios'


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [street, setStreet] = useState('');
  // const [zipcode, setZipcode] = useState('');
  // const [country, setCountry] = useState('');
  // const [phone, setPhone] = useState('');
  const { cartItems, setCartItems, delivery_fee, getCartAmount, backendUrl, products, token, navigate } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName : '',
    lastName : '',
    email: '',
    street : '',
    city : '',
    zipcode : '',
    country : '',
    phone : ''

  })

  const onChangeHandler = (e)=> {
    const name = e.target.name 
    const value = e.target.value

    setFormData(data=> ({...data, [name] : value}))
  }

  const order = async (orderData)=> {
    try {
      const response = await axios.post(backendUrl+ '/api/order/place', orderData, {headers: {token}})
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.data.message)
    }
  }

  const onSubmitHandler = async (e)=> {
    e.preventDefault()
    if(cartItems){
      toast.error('Your cart is empty')
      return null
    }
    try {
        let orderItems = []

        for (const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item]> 0 ){
              const itemInfo = structuredClone(products.find(product=> product._id === items))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }

        let orderData = {
          address : formData,
          items : orderItems,
          amount : getCartAmount() + delivery_fee
        }


        switch (method){
          // API calls for COD Method

          case 'cod':
            order(orderData)
            break;
            default :
            break;
        }

    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 px-5 sm:pt-14 min-h-[80vh] border-t max-w-[1280px] mx-auto'>
      {/* --------- Left Side ----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='First name'
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Last name'
          />
        </div>
        <input
          required
          type="email"
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Email address'
        />
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name='city'
          value={formData.city}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='City'
        />
        <div className='flex gap-3'>
          <input
            type="number"
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Zipcode'
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Country'
          />
        </div>
        <input
          required
          type="number"
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Phone'
        />
      </div>

      {/* ------------ Right Side ------------------- */}
      <div className='mt-8'>
        <div className='mt-8'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ------------ Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
            </div>
            <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
