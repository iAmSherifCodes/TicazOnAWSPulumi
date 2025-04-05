import React, { useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader"


function ButtonLayout({title,onClick, loading}) {
  return (
    <div>
       <button className='bg-black w-full my-3 p-2 rounded-md text-white' onClick={onClick}> {loading ? <PuffLoader color='white' size={25}/>:title}</button>
    </div>
  )
}

export default ButtonLayout