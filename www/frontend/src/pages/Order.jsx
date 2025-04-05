import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Order = () => {

    const {backendUrl,  currency} = useContext(ShopContext)

    const token = localStorage.getItem("token");


    const [orderData, setOrderData] = useState([])

    const loadOrderData = async ()=> {

      try {
        if(!token){
          return null
        }

        // const response = await axios.get(backendUrl+'/v1/getclientOrders', {}, {headers : {token}})
        const response = await fetch (backendUrl + '/v1/getclientOrders',{
         method:"GET",
         headers:{
          "Content-Type":"aplication/json",
          Authorization:`Bearer ${token}`
        }
        })
        const server = await response.json()
        setOrderData(server?.data)
        if(server?.message === "Invalid or expired token"){
          toast.error("Sorry you can't view your RECENT-ORDERS at the moment!, please login and check again")

        }
      

      } catch (error) {
        console.log(error)
        if(error?.status === 401){
          toast.error("You can view your RECENT-ORDERS at the moment!, please login and check again")
          }
      }

    }

    useEffect(()=> {
      loadOrderData()
    }, [token])


  return (
    <div className='border-t pt-[120px] max-w-[1180px] mx-auto px-5'>

<div className='text-2xl'>
  <Title text1={'MY'} text2={'ORDERS'} lenght={orderData?.length}/>
</div>

<div>
  {orderData?.length > 0 ? orderData.map((item, index)=>(
    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
       <div className='flex flex-col lg:flex-row gap-6 text-sm'>
        {
          item?.orderItems?.map((d, i)=>{
            return(
<>
        <img key={i}  className='w-full lg:w-32' src={d?.image} alt="" />
        <div>
          <p className='sm:text-base font-medium'></p>
          {
            item?.orderItems?.map((d, i)=>{
              return(

          <div key={i} className='flex items-center gap-3 mt-2 text-base text-gray-700'>
            <p className='text-lg'>NGN{new Intl.NumberFormat().format(d.price)}</p>
            <p>Quantity : {d.qty}</p>
            
          </div>
              )
            })
          }
          <p className='mt-2'>Date: <span className='text-gray-400'>{item?.createdAt?.slice(0,10)}</span></p>
          <p className='mt-2'>Payment : <span className='text-gray-400'>NGN {new Intl.NumberFormat().format(d?.price)}</span></p>
          <p className='mt-2'>Total : <span className='text-green-500'>NGN {new Intl.NumberFormat().format(d?.price * d?.qty)}</span></p>
        </div>
</>
            )
          })
        }
       </div>

       <div className='md:w-1/2 flex justify-between'>
       {/* <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button> */}
       </div>
       <div className='flex items-center gap-2'>
        <p className={`min-w-2 h-2 rounded-full ${item?.paymentStatus === "pending" ? "bg-yellow-300" : item?.paymentStatus === "Successful" ? "bg-green-500":""}`}></p>
        <p className='text-sm md:text-base'>{item?.paymentStatus}</p>
       </div>
    </div>
  )) : <div className='py-9 flex items-center justify-center'>
  <p className='text-xl text-[#d2d2d2]'>You have no orders yet.</p>
</div>}
</div>

    </div>
  )
}

export default Order