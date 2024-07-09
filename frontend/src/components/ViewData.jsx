import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewData() {    
    let [data, setData] = useState([])
    let {id} = useParams()
    console.log(data)
    

    async function getDataBYId(){
        let result  = await axios.get(`http://localhost:3000/api/getProductById/${id}`)
        setData(result.data)
    }
    useEffect(()=>{
getDataBYId()
    },[])
  return (
   <>
   <div className='w-screen h-screen flex justify-center items-center'>
    {data.map((data)=>(
         <div className="w-[300px] rounded-md border">
         <img
         src={`http://localhost:3000/${data.image}`}
           className="h-[200px] w-full rounded-md object-cover"
         />
         <div className="p-4">
           <h1 className="text-lg font-semibold">Product Brand:- <span className='text-bold text-2xl'>{data.ProductBrand}</span></h1>
           <h1 className="text-lg font-semibold">Product Type:- <span className='text-bold text-2xl'>{data.ProductType}</span></h1>
           <h1 className="text-lg font-semibold">Product Price:- <span className='text-bold text-2xl'>{data.ProductPrice}</span></h1>
           <h1 className="text-lg font-semibold">Product Rating:- <span className='text-bold text-2xl'>{data.ProductRating}</span></h1>
          
           <button
             type="button"
             className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
           >
             Read
           </button>
         </div>
       </div>
    ))}
   </div>
   </>
  )
}