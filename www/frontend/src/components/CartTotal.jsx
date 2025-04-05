import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = ({totalPrice,deliveryPrice,subtotal}) => {


const {currency, delivery_fee, getCartAmount}  = useContext(ShopContext)

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>₦{subtotal}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>₦:{deliveryPrice}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>₦{totalPrice}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal