import React from 'react'

const NewsLetterBox = () => {


  const onSubmitHandler= (e)=>{
    e.preventDefault()
  }
  const images = ["https://cdn.shopify.com/s/files/1/0802/6498/6927/files/Screen_Shot_2024-10-13_at_12.22.45_PM.png?width=412&crop=center&v=1728818631","https://cdn.shopify.com/s/files/1/0802/6498/6927/files/IMG_5722.jpg?width=412&crop=center&v=1732484942"]

  return (
    <div>

    <div className='text-center mt-32 mb-20 p-3'>
      <p className='text-2xl font-medium text-gray-800'>Join Our Community</p>
      <p className='text-gray-400 mt-3'>Sign up to receive the latest news, updates, and exclusive offers!</p>
      <form  onSubmit={onSubmitHandler} className='w-full sm:w-1/3 flex items-center gap-3 rounded-sm overflow-hidden mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email for newslatter' required />
        <button type='submit' className='bg-[#232323] text-white text-xs font-semibold px-4 py-4'>SUBSCIRBE</button>
      </form>
        <p className=' text-gray-600 mt-4 text-sm'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
    </div>
    {/* <div className='flex'>
      {images?.map((s, i)=>{
        return(
          <div className='h-[170px]' key={i}>
            <img  src={s} alt='img' className='w-full h-full'/>

          </div>

        )
      })}
    </div> */}
    
    </div>
  )
}

export default NewsLetterBox