import Head from 'next/head'
import Link from "next/link"
import {useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

// const router = useRouter();
const [uid ,setuid]=useState();
const [pass,setpass]=useState();

// const [msg,setMsg]=useState(router.query.msg);


  return (
   <div className="bg-gray-900 flex flex-row justify-between items-center m-0 p-0 h-screen text-gray-50">
     <Head>
        <title>Admin Login </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
     <div className="bg-gray00 h-full w-3/6 ">
       
       <img src="11.jpg" className="object-none  w-full h-full opacity-30 "></img>
     </div>
     
     <div className="bg-gray-300 flex flex-row items-center justify-center shadow-md  h-full w-4/6">
        <div className=" -translate-x-7 text-gray-800 text-6xl tracking-wider relative">Admin Login</div>
         
       <div className="w-5/12  bg-gray-900 text-gray-100 p-8 shadow-gray-300 py-24 hover:py-20 tracking-wider shadow-2xl hover:shadow-2xl transition-all duration-300 ease-in-out">
        
         <form action="" method="">
           <div>
             UserName<br></br>
              <input onChange={()=>{setuid(event.target.value);}} type={'text'} placeholder="Ronda Rausy" className="bg-gray-900 outline-none m-3 p-3 w-full text-gray-100 "></input>
           </div>

           <div>
             Password<br></br>
              <input onChange={()=>{setpass(event.target.value);}} type={'password'} placeholder="use special characters" className="bg-gray-900 outline-none m-3 p-3 w-full text-gray-100 "></input>
              <Link href={"/"}>

              <a className="text-gray-300 ml-44 text-xs underline underline-offset-2" >forgot password ?</a>
              </Link>
           </div>

           {/* <a href="/panel" type="submit" className="w-14 mt-10 mx-auto h-14 flex flex-col items-center justify-center bg-slate-300  text-black rounded-full shadow-md hover:shadow-gray-100/50">
             <img src="/arrow.svg" className="h-8 w-8"></img>
           </a>
            */}
            <Link href={'/panel'}>

            <a  type="submit" className="w-14 mt-10 mx-auto h-14 flex flex-col items-center justify-center bg-slate-300  text-black rounded-full shadow-md hover:shadow-gray-100/50">
             <img src="/arrow.svg" className="h-8 w-8"></img>
           </a>
            </Link>
           
         </form>


       </div>
     </div>
   </div>
  )
}
