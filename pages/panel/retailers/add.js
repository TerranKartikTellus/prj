import SidePanel from "/components/sidepanel";
import Head from 'next/head'
import { useState } from "react";

import Link from 'next/link'


export default function Panel() {


          return (
          <div className="flex flex-row h-screen items-start overflow-y-hidden">
                     <Head>
        <title>Add new retailer </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
                    <div className="h-full bg-gray-200  w-3/12"><SidePanel></SidePanel></div>
                    <div className="h-full bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-fuchsia-500/30 w-9/12">
                              <div className="flex flex-row items-center justify-between">
                              <Link href="/panel">

                              <a  className="bg-gray-800 text-gray-100 ml-20 p-3 rounded-md hover:bg-gray-100 hover:text-gray-900 font-semibold px-5 translate-y-16 hover:bg-opacity-30 tracking-wider">Back</a>
                              </Link>
                              
                              <div className="text-5xl  tracking-wide mt-5 mr-5  text-right">
                                        WholeSale Management <br></br> System
                              </div>
                              </div>
                              <div className="p-20 bg-gray-100 mt-10 mx-10 bg-opacity-30">
                                      <div className="text-2xl tracking-wider">Add New Retailers</div>
                                      <br></br>
                                      <div><Form></Form></div>
                              </div>
                              
                    </div>
          </div>
);
}
function Form(){
        
        const [retailerId              , setRID]         = useState("");         
        const [retailerName            , setRNAME]       = useState(""); 
        const [retailerAddress         , setRADDRESS]    = useState(""); 
        const [retailerContactnumber   , setRCONTACT]    = useState(""); 
        const [error , setError] = useState();

        async function submitForm(e){
                e.preventDefault();
             console.log("sdad");
                     
                     const response = await fetch(
                             '/api/operations/retailer/addRetailer',
                             {
                                     method: 'POST',
                                     body: JSON.stringify(
                                             {
                                                     'rid': retailerId,
                                                     'rname': retailerName,
                                                     'raddress': retailerAddress,
                                                     'rcontact': retailerContactnumber
                                             }
                                     ),
                                     headers: {
                                             'Content-Type': 'application/json'
                                     }
                             }
                     );
                     const jsonResponse = await response.json();
                     console.log(jsonResponse); 
                     if(jsonResponse.msg == 'Insertion Completed'){
                             window.location.replace("/panel/retailers?newRetailer=New%20retailer%20Added");
                     }
                     else {
                             setError(['An Error has Occured','Please Retry'])
                     }
             }


        return(
                <div>
                        <form >

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
                        <label className="w-1/2 bg-transparent" htmlFor="rid">Retailer Id</label>
                        <input required  className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         name="retailerId" onChange={()=>{setRID(event.target.value);}}
                        type="number"  id="123"  placeholder="Enter Id"></input>
                        </div>

                        <br></br>
                        <div className=" flex flex-row text-xl capitalize justify-start items-center">
                        <label className="w-1/2 bg-transparent" htmlFor="rname">Product Name</label>
                        <input required  className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900"
                         name="retailerName" onChange={()=>{setRNAME(event.target.value);}}
                        type="string"  id="name"  placeholder="Enter Name"></input>
                        </div>
                        <br></br>

                        <div className=" flex flex-row text-xl capitalize justify-start items-center">
                        <label className="w-1/2 bg-transparent" htmlFor="raddress">Retailer address</label>
                        <input required className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900" onChange={()=>{setRADDRESS(event.target.value);}}
                          name="retaileraddress"
                         type="string"  id="address" placeholder="Enter Address"></input>
                        </div>
                        <br></br>

                        <div className=" flex flex-row text-xl capitalize justify-start items-center">
                        <label className="w-1/2 bg-transparent" htmlFor="rcontact">Retailer Contact</label>
                        <input required  className="w-1/2 bg-transparent border-b-2 px-2 py-1 border-gray-900" onChange={()=>{setRCONTACT(event.target.value);}}
                         name="retailerContactnumber"
                         type="number"  id="123" placeholder="Enter Contact number"></input>
                        </div>
                        <button onClick={submitForm} type="submit" className="bg-gray-800 text-gray-100 ml-20 p-3 rounded-md hover:bg-gray-100 hover:text-gray-900 font-semibold px-5 translate-y-16 hover:bg-opacity-30 tracking-wider" style={{position:'relative', right: '80px'}}>
                                Submit
                        </button>
                        </form>
                </div>
        );
}