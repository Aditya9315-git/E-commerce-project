import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



export default function Home(){
    let [data, setData] = useState([])
    let Navigation=useNavigate()
    let [inp,setInp]=useState('')
    let{login}=useContext(UserContext)

    console.log(inp)

    useEffect(() => {
      fetchProductData()
    }, [])
  
    async function fetchProductData() {
      let result = await axios.get('http://localhost:3000/api/getProduct')
      setData(result.data)
    }

    // Button filter/////

    async function Puma(){
      let result = await axios.get('http://localhost:3000/api/getProduct')
      let final= result.data.filter((item)=>item.ProductBrand =="Puma")
      setData(final)

    }

    async function Nike(){
      let result = await axios.get('http://localhost:3000/api/getProduct')
      let final=result.data.filter((item)=>item.ProductBrand=="Nike")
      setData (final)
    }

    async function Zudio(){
      let result = await axios.get('http://localhost:3000/api/getProduct')
      let final=result.data.filter((item)=>item.ProductBrand=="Zudio")
      setData(final)
    }

    // Search bar setup////
    async function handleSearch(){
      let result = await axios.get(`http://localhost:3000/api/searchProduct/${inp}`)
      setData(result.data)  
    }
    // if (inp===''){
    //   fetchProductData()
    // }


    async function saveCart(data){
      // console.log(data)

      if (login){
      let result=await axios.post(`http://localhost:3000/api/cartSave/${login}`,{
        ProductBrand: data.ProductBrand,
        ProductPrice: data.ProductPrice,
        ProductType: data.ProductType,
        ProductRating: data.ProductRating
      })

      if (result.data == true){
        fetchCartData()
        alert("Product save into cart !!")
      }
    }else{
      Navigation('/clientLogin')
    }
    }

    // cart//

    let {setCount} = useContext(UserContext)

    useEffect(() => {
        fetchCartData()
    }, [])
  
    async function fetchCartData() {
      let result = await axios.get(`http://localhost:3000/api/getCart/${login}`)
      setCount(result.data.length)
      setCount=0
    
    }
    
  return (
    <>
    <aside className="fixed flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
      {/* <a href="#">
        <svg
          width="40"
          height="46"
          viewBox="0 0 50 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
            fill="white"
          />
        </svg>
      </a> */}
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
           
<form class="max-w-md mx-auto "onClick={handleSearch} >   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">

        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Product by type..." required  onChange={(e)=>setInp(e.target.value)} />
    </div>
    
    <button className='relative top-[10px] p-2 bg-white rounded-[10px] text-10px top- font-bold hover:bg-gray-400 hover:text-white'
    onClick={handleSearch}
    >Search</button>
</form>

         


          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">Brands</label>
            <button
            onClick={fetchProductData}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
              <span className="mx-2 text-sm font-medium">All</span>
            </button>
            <button
            onClick={Puma}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Puma</span>
            </button>
            <button
            onClick={Nike}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Nike</span>
            </button>
            <button
            onClick={Zudio}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Zudio</span>
            </button>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">Customization</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>

    {/* // Card section start/// */}
    
   
    <div className='relative top-[60px] flex-wrap left-[250px] w-[1000px] h-screen flex justify-center items-center justify-evenly gap-[20px]'>
     {data.map((data)=>(
          <div className="w-[300px] rounded-md border flex flex-col justify-evenly items-center">
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
              onClick={()=>saveCart(data)}
              className="mt-5 rounded-sm bg-black px-2.5 py-2.5 m-auto text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
            >
              Add To Cart
            </button>
          </div>
        </div>
     ))}
    </div>
    </>
   )
 }

