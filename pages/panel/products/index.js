import SidePanel from "/components/sidepanel";
import Head from 'next/head'
import clientPromise from "/lib/mongodb";
import Link from 'next/link'

import React ,{useState} from "react"
import { useRouter } from 'next/router';


export default function Panel({Allproducts}) {
const msgNewProduct = [ null , null ];
// const msgNewCategory =[ null , null ];
// const msgNewSupplier =[ null , null ];
// const msgNewRetailer =[ null , null ];
const router = useRouter()
  // console.log(router.query.newproduct);
// console.log(Allproducts);
return (
          <div className="flex flex-row h-screen items-start overflow-y-hidden">
                     <Head>
        <title>View All products </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
                    <div className="h-full bg-gray-200  w-3/12"><SidePanel></SidePanel></div>
                    <div className="overflow-y-auto h-full bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-fuchsia-500/30 w-9/12">
                              <div className="flex flex-row items-center justify-between">
                              <Link href="/panel">

                              <a  className="bg-gray-800 text-gray-100 ml-20 p-3 rounded-md hover:bg-gray-100 hover:text-gray-900 font-semibold px-5 translate-y-16 hover:bg-opacity-30 tracking-wider">Back</a>
                              </Link>
                              
                              <div className="text-5xl  tracking-wide mt-5 mr-5  text-right">
                                        WholeSale Management <br></br> System
                              </div>
                              </div>
                              <div className="mt-8 m-3 p-8 mx-auto">
                                <div className="mx-auto text-5xl font-mono font-bold">All products</div>
                                <div className="mx-auto "><Table msg={router.query.msg} products={Allproducts}></Table></div>
                              </div>
                    </div>
                    
          </div>
);
}
 function Table({msg,products}){
  const [newproduct , setNewproduct] = useState(msg);
  const [error , setError] = useState();
 const [upd, setupd] = useState();

  
  const [id , setId] = useState();
   async function Delete(){
          //  e.preventDefault();
          console.log('-----------',id);
       
          if(confirm('Are you sure you want to delete this item ?')){
            const response = await fetch(
                        '/api/operations/products/delproduct',
                        {
                                method: 'POST',
                                body: JSON.stringify(
                                        {
                                                '_id': id
                                        }
                                ),
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        }
                );
                const jsonResponse = await response.json();
                console.log(jsonResponse); 
                if(jsonResponse.msg == 'Deletion Completed'){
                        window.location.replace("/panel/products?newUser=User%20Deleted");
                }
                else {
                        setError(['An Error has Occured','Please Retry']);
                        console.log("qw->",error);
                }
          }
                
                
        }

  return(
    <div className="mx-auto flex flex-row items-center justify-center mt-5">
      {
        upd && 
          <div className="p-14 absolute top-32 left-auto right-auto z-50 w-9/12 bg-gray-100 bg-opacity-95 scale-90 hover:scale-95 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out ">
            <div className="flex flex-row justify-between items-center text-5xl font-semibold">
              <div>UPDATE</div>
              <div><button onClick={()=>setupd()} ><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></button></div>  
            </div>  

            <div className="py-20">
              <Form upd={upd} ></Form>
            </div>
          </div>   
      }
      {
        error && <div>{error}</div>
      }
      {
        products 
        ? 
        <div className="">
          {
                                        newproduct && 
                                        <div className="flex flex-row justify-between items-start w-96 p-2 tracking-wider m-1 rounded-lg absolute right-0 top-0 bg-green-600 text-gray-200">
                                                {

                                                        <div >
                                                                <div className="text-xl">{newproduct}</div>
                                                                
                                                                
                                                        </div>
                                                }
                                                <div><button onClick={()=>{setNewproduct("")}} className=" text-2xl bg-gray-900 p-2 ml-3 rounded-md">X</button></div>        
                                        </div>
          }
          <div>
            <table className="text-center px-2 py-1 scale-90"> 
              <tr className="font-mono text-xl border-b-4 tracking-widest">
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">Sno</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">PID</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">Product Name</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">MRP</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">orignalPrice</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">rating</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">quantity</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100 text-sm"> Product Category Id</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">Update</th>
                <th className=" text-center px-2 py-1 bg-gray-700 text-gray-100">Delete</th>
                
              </tr>
            
          {products.map((i,x=1)=>(
            <tr key={i._id}  className="border-b-2 border-gray-800 tracking-wider bg-gray-700 bg-opacity-30 hover:bg-opacity-50">
              <td className="text-lg border-r-2  text-center px-2 py-1 bg-opacity-90 font-extrabold" >{x+1}</td>
              <td className="text-lg border-r-2  text-center px-2 py-1 bg-opacity-90 font-extrabold" >{i.pid}</td>
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.pname}</td>
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.mrp}</td> 
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.originalPrice}</td>
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.rating}</td>
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.quantity}</td>
              <td className="text-lg border-r-2 text-center px-2 py-1  bg-opacity-90" >{i.pCategoryId}</td>
            
             <td className="w-[100px] h-full" >
                <button className="w-full h-full text-center px-2 py-1
                  hover:scale-110   bg-opacity-90  hover:bg-blue-600
                   transition-all duration-300 ease-in-out"
                 onClick={
                    ()=>{setupd([i._id,i.pid,i.pname,i.mrp,i.originalPrice,i.rating,i.quantity,i.pCategoryId]);}
                 }
                 >
                   <img src="/edit.svg" className="w-7 h-7 mx-auto"></img>
                </button>
              </td>
              <td className="w-[100px] h-full" >
                <button className="w-full h-full text-center px-2 py-1
                  hover:scale-110   bg-opacity-90  hover:bg-red-600
                   transition-all duration-300 ease-in-out"
                 onClick={()=>{setId(i._id); Delete(i);}} 
                 onMouseEnter={()=>{setId(i._id); }} >
                   <img className="w-7 h-7 mx-auto" src="/delete.svg"></img>
                </button>
              </td>
            
            </tr>
          ))}
          </table>
          </div>
        </div> : <div className="text-3xl bg-gray-800 text-gray-100 ring-2 ring-red-600">No users found</div>
      }
    </div>
  );
}

export async function getServerSideProps(context) {
 
   const client = await clientPromise;
 const db = client.db("wholesale");
  const Allproducts = await db
    .collection("product")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  // console.log(Allproducts);
  
  return {
    props: {
      Allproducts: JSON.parse(JSON.stringify(Allproducts)),
    } // will be passed to the page component as props
  }
}


function Form({upd}){
        
        const [pid             , setPID]           = useState(upd[1]);         
        const [pname     , setPNAME]         = useState(upd[2]); 
        const [mrp      , setMRP]           = useState(upd[3]); 
        const [originalPrice   , setOriginalPrice] = useState(upd[4]); 
        const [rating   , setRATING]        = useState(upd[5]);
        const [quantity , setQUANTITY]      = useState(upd[6]); 
        const [pCategoryId , setPCATEGORYID]      = useState(upd[7]); 
         const [error , setError] = useState();
        async function submitForm(e){
         e.preventDefault();
                   console.log("sdad");
                
         const response = await fetch(
                 '/api/operations/products/updateproduct',
                 {
                         method: 'POST',
                         body: JSON.stringify(
                                 {
                                          '_id': upd[0],
                                         'pid': pid,
                                         'pname': pname,
                                         'mrp': mrp,
                                         'originalPrice': originalPrice,
                                         'rating': rating,
                                         'quantity': quantity,
                                         'pCategoryId': pCategoryId
                                 }
                                 ),
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        }
                );
         const jsonResponse = await response.json();
         console.log(jsonResponse); 
         if(jsonResponse.worked){
                 window.location.replace("http://localhost:3000/panel/products?msg=Item%20Updated");
         }
         else {
                 setError(['An Error has Occured','Please Retry'])
         }
 }
 return (
         <div>
           _id:{upd[0]}
                 <form  >
                         {
                                 error && 
                                 <div className="flex flex-row justify-between items-start w-96 p-2 tracking-wider m-1 rounded-lg absolute right-0 top-0 bg-red-600 text-gray-200">
                                         {

                                                 <div >
                                                         <div className="text-xl">{error[0]}</div>
                                                         <div className="text-base">{error[1]}</div>
                                                         
                                                 </div>
                                         }
                                         <div><button onClick={()=>{setError("")}} className=" text-2xl bg-gray-900 p-2 ml-3 rounded-md">X</button></div>        
                                 </div>
                         }
                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div className="w-1/2 bg-transparent">pid: <span className="p-1 text-red-500 font-semibold">old value: {upd[1]}</span></div> 
                         <input defaultValue={upd[1]} required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900" type="number" name="pid"
                         onChange={()=>{setPID(event.target.value);}}
                         ></input><br></br>
                        </div>
                        <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >pname: <span className="p-1 text-red-500 font-semibold">old value: {upd[2]}</span></div>
                          <input defaultValue={upd[2]} required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900" type="text" name="pname"
                         onChange={()=>{setPNAME(event.target.value);}}
                         ></input>
                         </div>

                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >mrp: <span className="p-1 text-red-500 font-semibold">old value: {upd[3]}</span></div> 
                         <input defaultValue={upd[3]} required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         onChange={()=>{setMRP(event.target.value);}}
                         type="number" name="mrp"></input>        
                         </div>

                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >originalPrice: <span className="p-1 text-red-500 font-semibold">old value: {upd[4]}</span></div>
                          <input defaultValue={upd[4]} required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                          onChange={()=>{setOriginalPrice(event.target.value);}}
                         type="text" name="position"></input>
                         </div>
                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >rating: <span className="p-1 text-red-500 font-semibold">old value: {upd[5]}</span></div> 
                         <input  defaultValue={upd[5]} required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         onChange={()=>{setRATING(event.target.value);}}
                         type="number" name="rating"></input>        
                         </div>
                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >quantity: <span className="p-1 text-red-500 font-semibold">old value: {upd[6]}</span>
                         </div>
                         <input defaultValue={upd[6]}  className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         onChange={()=>{setQUANTITY(event.target.value);}}
                         type="number" name="quantity"></input>        
                         </div>
                  
                         <div className=" flex flex-row text-xl capitalize justify-start items-center">
                         <div  className="w-1/2 bg-transparent" >Product category Id:  <span className="p-1 text-red-500 font-semibold">old value: {upd[7]}</span>
                         </div>
                         <input defaultValue={upd[7]}   className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         onChange={()=>{ setPCATEGORYID(event.target.value);}}
                         type="number" name="quantity"></input>        
                         </div>
                  

                         
                         <div><button onClick={submitForm}  name="Submit" className="bg-gray-800 text-gray-100 ml-20 p-3 rounded-md hover:bg-gray-100 hover:text-gray-900 font-semibold px-5 translate-y-16 hover:bg-opacity-30 tracking-wider">Update Products</button></div>
                 </form>
         </div>
 );
}
