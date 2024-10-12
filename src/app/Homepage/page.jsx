'use client'

import LinkContainer from '@/Component/LinkContainer/LinkContainer'
import React, { useEffect, useState } from 'react'



function page() {



    const [ShowProfile, setShowProfile] = useState(true)
    const [ShowPreview, setShowPreview] = useState(false)
    const [userInfo, setuserInfo] = useState(
                                                    {
                                                        FirstName:"",
                                                        LastName:"",
                                                        Email:"",
                                                        Image:{
                                                            file: null,
                                                            url: null,
                                                        },
                                                        Links:[
                                                            {
                                                                Type:"",
                                                                Order:"",
                                                                Adress:"",
                                                            }
                                                        ]
                                                    }
                                                    )

    

            const [LinkInfo, setLinkInfo] = useState([
                                                        {
                                                            type:"Github",
                                                            icon:"fa-github",
                                                            Validation:"www.github.com",
                                                            color:"bg-black"
                                                        },
                                                        {
                                                            type:"YouTube",
                                                            icon:"fa-youtube",
                                                            Validation:"youtube.com",
                                                            color:"bg-red-600"
                                                        },
                                                        {
                                                            type:"Linkedin",
                                                            icon:"fa-linkedin",
                                                            Validation:"linkedin.com",
                                                            color:"bg-blue-700"
                                                        },
                                                        {
                                                            type:"Facebook",
                                                            icon:"fa-facebook",
                                                            Validation:"facebook.com",
                                                            color:"bg-blue-600"
                                                        }
                                                    ])



            // var LinksID=[];

            const [LinksData, setLinksData] = useState([])
            const [LinksID, setLinksID] = useState([])


            
            








    

  return (

    <>

    {!ShowPreview && 

        <div>
            <div className='p-2 px-6 w-full shadow bg-white flex h-14 items-center justify-between'> 
                <div className="left-section flex">
                    <img src="/Kahf Logo.jpg" alt="Lgog" className='h-6 w-6 mr-2' />
                    <p className='hidden md:block text-black font-extrabold'> devlinks </p>
                </div>
                <div className="link-section flex items-center">

                    <div className={`flex items-center hover:shadow cursor-pointer hover:scale-105 duration-300 p-2 rounded mr-3 ${ShowProfile ? 'text-black' : 'text-purple-500 bg-purple-200'}`} onClick={e=> setShowProfile(false)}>
                        <i className="fas fa-link text-sm"></i>
                        <span className='hidden md:inline-block text-sm font-bold ml-1'>Links</span>
                    </div>

                    <div className={`flex items-center hover:shadow cursor-pointer hover:scale-105 duration-300 p-2 rounded ${!ShowProfile ? 'text-black' : 'text-purple-500 bg-purple-200'}`}  onClick={e=> setShowProfile(true)}>
                        <i className="far fa-user-circle"></i>
                        <span className='hidden md:inline-block text-sm font-bold ml-1'> Profile Details</span>
                    </div>            
                </div>

                <div className="right-section" onClick={e=> setShowPreview(true)}>
                    <span className='block md:hidden'> <i className="far fa-eye border border-purple-700 text-purple-500 hover:border-black  hover:bg-purple-700 hover:text-white rounded p-2 px-3 cursor-pointer hover:scale-105 duration-300"></i></span>
                    <div className='hidden md:block text-sm border border-purple-700 text-purple-500 hover:border-black  hover:bg-purple-700 hover:text-white rounded p-1 px-6 cursor-pointer hover:scale-105 duration-300'> Preview </div>
                </div>
            </div>




            


            <div className='bg-gray-100 flex p-4'>

                <div className="hidden w-5/12 rounded md:grid py-20 overflow-hidden items-center justify-center bg-white mr-4">

                    {/* Mobile Holder Section */}
                    {/* Mobile Holder Section */}

                    <div className='border text-black border-black rounded-3xl w-52 px-4 pt-8 flex flex-col items-center' style={{height:"420px"}}>  
                        <img src={userInfo.Image.url ? userInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                        <p className='text-sm font-bold mt-3'> {userInfo.FirstName} {userInfo.LastName} </p>
                        <p className='text-xs mt-3 mb-4'> {userInfo.Email} </p>

                        {/* Github */}
                        {/* Github */}

                        {/* {LinkInfo.map(e=>
                            <div className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${e.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                                <div>   <i className={`fab ${e.icon} mr-1`}></i>  <span> {e.type} </span>   </div>
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        )} */}

                        {LinksData.length > 0 && LinksData.map(x=>
                            <div key={x.id} className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                                <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.type} </span>   </div>
                                <i className="fas fa-arrow-right"></i>
                            </div>
                        )}



                        
                        {/* Youtube */}
                        {/* Youtube */}
                        {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-red-600 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                            <div>   <i className="fab fa-youtube mr-1"></i>  <span> YouTube </span> </div>
                            <i className="fas fa-arrow-right"></i>
                        </div> */}



                        {/* LinkedIn */}
                        {/* LinkedIn */}
                        {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-blue-700 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                            <div>   <i className="fab fa-linkedin mr-1"></i>  <span> Linkedin </span>   </div>
                            <i className="fas fa-arrow-right"></i>
                        </div> */}

                        

                        {/* Facebook */}
                        {/* Facebook */}
                        {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-blue-600 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                            <div>   <i className="fab fa-facebook mr-1"></i>  <span> Facebook </span>   </div>
                            <i className="fas fa-arrow-right"></i>
                        </div> */}
                    </div>
                </div>









            {
                ShowProfile &&
                





                <div className="rounded bg-white w-full md:w-7/12 p-6 px-8  flex flex-col">
                    <p className='text-lg font-bold text-black'> Profile Details </p>
                    <p className='text-xs mt-1 text-stone-600'> Add your details to create a personal touch to ypur profile. </p>
            



                    {/* Profile Edit */}
                    {/* Profile Edit */}
                    <div className='grid md:flex w-full md:h-44 bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center justify-around'>
                        <div className='p-1 h-8 w-full grid items-center md:w-4/12'> Profile Picture </div>
                        <div className='p-1 h-44 md:h-auto w-full md:w-3/12 relative rounded-md overflow-hidden'> 
                            <label htmlFor="profile-input">
                                <img src={userInfo.Image.url ? userInfo.Image.url : '/avatar.png'} alt="" className='h-full w-full absolute top-0 left-0 z-20 object-contain'/> 
                                <div className='grid items-center text-center align-middle bg-black text-white opacity-60 h-full w-full cursor-pointer z-30 absolute top-0 left-0'>
                                    <div className=''>
                                        <i className="far fa-image text-2xl"></i>
                                        <p> Change Image </p>
                                    </div>
                                    
                                </div>
                            </label>
                            <input type="file" id='profile-input' className='h-full w-full cursor-pointer bg-transparent hidden' onChange={myImage => setuserInfo({...userInfo, Image: {file: myImage.target.files[0], url: URL.createObjectURL(myImage.target.files[0])}})} />
                        </div>
                        <div className='p-1 h-10 w-full text-xs grid justify-center items-center md:w-4/12'> Image must be bellow 1024×1024px. Use PNG, JPG or BMP format.  </div>
                    </div>


                    



                    {/* Profile Name */}
                    {/* Profile Name */}
                    <div className='w-full bg-gray-100 text-black text-sm px-3 py-6 rounded-md mt-4 self-center'>
                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> First name<sup>*</sup> </p>
                            <input name='FirstName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setuserInfo({...userInfo,[data.target.name]:data.target.value}) } />
                        </div>

                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> Last name<sup>*</sup> </p>
                            <input name='LastName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setuserInfo({...userInfo,[data.target.name]:data.target.value}) } />
                        </div>

                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> Email </p>
                            <input name='Email' type='email' className='borderoutline-purple-600 border-gray-300  w-full px-3 py-2 rounded pl-8' onChange={data=> setuserInfo({...userInfo,[data.target.name]:data.target.value}) } />
                        </div>
                    </div>




                    
                    <div className='w-full md:w-24 px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-black bg-purple-700 text-white mt-3 self-end rounded-md text-center'>  Save </div>
                    
                </div>



            }




{/* 
import { useState } from 'react';

export default function MyComponent() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]); // Add an item
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index); // Delete an item
    setItems(updatedItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
} */}











            {
                !ShowProfile &&

                    
                    <div className="rounded bg-white w-full md:w-7/12 p-6 px-8 flex flex-col">
                        <p className='text-lg font-bold text-black'> Customize your links </p>
                        <p className='text-xs mt-1 text-stone-600'> Add/ Edit/ Remove links bellow and then share all your profiles with the world! </p>
                
                        <div className='w-full mt-6 text-center justify-self-center text-sm border border-purple-700 text-purple-500 cursor-pointer  hover:border-white  hover:bg-purple-700 hover:text-white rounded p-1 hover:scale-105 duration-300' onClick={()=>{ setLinksID([...LinksID, {id:`${Date.now()}`}])}} >  + Add new link  </div>


                        <div id='LinkEditContainer'>

                            {/* Link Container */}
                            {/* Link Container */}
                            {/* <div className='w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center' id="">
                                <div className='flex justify-between'> 
                                    <div>
                                        <span>=</span><span> link #</span><span>1</span>
                                    </div>
                                    <div className='cursor-pointer py-1 px-2 text-sm'>Remove</div>
                                </div>

                                <p className='pt-3'> Platform </p>
                                <div className='relative' >
                                    <p className='bg-white border border-stone-400 w-full px-3 py-2 rounded'  onClick={(e)=> {e.target.nextElementSibling.classList.remove("hidden") }}> Choose Platform </p>
                                    <div className='absolute z-20 hidden w-full bg-white mt-1 border border-stone-500'>
                                        {LinkInfo.map(info=> 
                                            <p className='cursor-pointer py-2 hover:bg-slate-600 hover:text-white border-t px-3' onClick={(e)=> { e.target.parentElement.previousSibling.innerHTML=  `<i className="fab ${info.icon} mr-1"></i>  ${info.type}`;  e.target.parentElement.classList.add("hidden")   } } > <i className={`fab ${info.icon} mr-1`}></i>  {info.type} </p>    
                                        )}
                                    </div>
                                </div>

                                <p className='mt-3'> Link </p>
                                <div className='relative'>
                                    <input type='text' className='border border-stone-400 w-full px-3 py-2 rounded pl-8' />
                                    <i className="fas fa-link absolute left-3 top-3"></i>
                                </div>
                            </div> */}


                            



                            {/* Link Container */}
                            {/* Link Container */}
                            

                            {LinksID.length > 0 && LinksID.map(e=> <LinkContainer key={e.id} LinkID={e.id}  LinksData={LinksData}  setLinksData={setLinksData}  /> )}


                            {/* <div className='w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center'>
                                <div className='flex justify-between'> 
                                    <div>
                                        <span>=</span><span> link #</span><span>1</span>
                                    </div>
                                    <div className='cursor-pointer py-1 px-2 text-sm'>Remove</div>
                                </div>

                                <p className='pt-3'> Platform </p>
                                <div className='relative' >
                                    <p className='bg-white border border-stone-400 w-full px-3 py-2 rounded'  onClick={(e)=> {e.target.nextElementSibling.classList.remove("hidden") }}> <i className="fab fa-github mr-1"></i>  Github </p>
                                    <div className='absolute z-20 hidden w-full bg-white mt-1 border border-stone-500'>
                                        {LinkInfo.map(info=> 
                                            <p className='cursor-pointer py-2 hover:bg-slate-600 hover:text-white border-t px-3' onClick={(e)=> { e.target.parentElement.previousSibling.innerHTML=  `<i className="fab ${info.icon} mr-1"></i>  ${info.type}`;  e.target.parentElement.classList.add("hidden")   } } > <i className="fab fa-github mr-1"></i>  {info.type} </p>    
                                        )}
                                    </div>
                                </div>

                                <p className='mt-3'> Link </p>
                                <div className='relative'>
                                    <input type='text' className='border border-stone-400 w-full px-3 py-2 rounded pl-8' />
                                    <i className="fas fa-link absolute left-3 top-3"></i>
                                </div>
                            </div> */}

                        </div>




                        
                        <div className='px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-black bg-purple-700 text-white w-24 mt-3 self-end rounded-md text-center'>  Save </div>
                        
                    </div>
            }



                </div>
        </div>

    }


    {ShowPreview && 



        <div className='flex flex-col bg-white justify-center items-center px-6'>
            <div className='bg-blue-600 h-52 w-full overflow-hidden absolute top-0 rounded-b-3xl'>            
            </div>




            <div className='p-2 px-6 w-full shadow z-20 bg-white flex h-14 items-center justify-between mt-4 mx-8 rounded-md'> 
                    <div className='text-xs md:text-sm border border-blue-700 text-blue-700 hover:border-black  hover:bg-blue-700 hover:text-white rounded p-1 px-3 md:px-6 cursor-pointer hover:scale-105 duration-300' onClick={e=> setShowPreview(false)}> Back to editor </div>

                    <div className='text-xs md:text-sm border hover:border-blue-700 hover:text-blue-700 hover:bg-white border-black  bg-blue-700 text-white rounded p-1 px-3 md:px-6 cursor-pointer hover:scale-105 duration-300'> Share link </div>
            </div>











            

            {/* Mobile Holder Section */}
            {/* Mobile Holder Section */}

            <div className='bg-white shadow-md border text-black border-black z-20 mt-20 rounded-3xl w-60 px-8 pt-8 flex flex-col items-center' style={{height:"420px"}}>  
                <img src={userInfo.Image.url ? userInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                <p className='text-sm font-bold mt-3'>  {userInfo.FirstName} {userInfo.LastName} </p>
                <p className='text-xs mt-3 mb-4'> {userInfo.Email} </p>




                {LinksData.length > 0 && LinksData.map(x=>
                    <div key={x.id} className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                        <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.type} </span>   </div>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                )}







                {/* Github */}
                {/* Github */}
                {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-black px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                    <div>   <i className="fab fa-github mr-1"></i>  <span> Github </span>   </div>
                    <i className="fas fa-arrow-right"></i>
                </div> */}

                
                {/* Youtube */}
                {/* Youtube */}
                {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-red-600 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                    <div>   <i className="fab fa-youtube mr-1"></i>  <span> YouTube </span> </div>
                    <i className="fas fa-arrow-right"></i>
                </div> */}



                {/* LinkedIn */}
                {/* LinkedIn */}
                {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-blue-700 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                    <div>   <i className="fab fa-linkedin mr-1"></i>  <span> Linkedin </span>   </div>
                    <i className="fas fa-arrow-right"></i>
                </div> */}

                

                {/* Facebook */}
                {/* Facebook */}
                {/* <div className='flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center bg-blue-600 px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md'>
                    <div>   <i className="fab fa-facebook mr-1"></i>  <span> Facebook </span>   </div>
                    <i className="fas fa-arrow-right"></i>
                </div> */}
            </div>
        </div>


    }
    </>

  )
}

export default page