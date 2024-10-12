'use client'

import LinkContainer from '@/Component/LinkContainer/LinkContainer'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Page() {


    const [ShowProfile, setShowProfile] = useState(true)
    const [ShowPreview, setShowPreview] = useState(false)
    const [UserInfo, setUserInfo] = useState(
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

    

                                                      const sensors = useSensors(
                                                        useSensor(PointerSensor),
                                                        useSensor(KeyboardSensor, {
                                                          coordinateGetter: sortableKeyboardCoordinates,
                                                        })
                                                      );



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


            
            

            const getTaskPos = (id) => LinksID.findIndex((task) => task.id === id);
            const getTaskPos2 = (id) => LinksData.findIndex((task) => task.id === id);


            const handleDragEnd = (event) => {
              const { active, over } = event;
          
              if (active.id === over.id) return;



        
              setLinksData((LinksData) => {
                const originalPos2 = getTaskPos2(active.id);
                const newPos2 = getTaskPos2(over.id);
                return arrayMove(LinksData, originalPos2, newPos2);
              });


              setLinksID((LinksID) => {
                const originalPos = getTaskPos(active.id);
                const newPos = getTaskPos(over.id);
          
                return arrayMove(LinksID, originalPos, newPos);
              });

            };





    

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
                        <img src={UserInfo.Image.url ? UserInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                        <p className='text-sm font-bold mt-3'> {UserInfo.FirstName} {UserInfo.LastName} </p>
                        <p className='text-xs mt-3 mb-4'> {UserInfo.Email} </p>


                        {LinksData.length > 0 && LinksData.map(x=>
                            <Link href={x.address ? x.address : ""} target="_blank" className='w-full'> 
                                <div key={x.id} className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                                    <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.typeInfo?.type} </span>   </div>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </Link>
                        )}



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
                        <div className='p-1 h-8 w-full grid items-center md:w-3/12 lg:w-4/12'> Profile Picture </div>
                        <div className='p-1 h-44 md:h-auto w-full md:w-5/12 lg:w-3/12 relative rounded-md overflow-hidden'> 
                            <label htmlFor="profile-input">
                                <img src={UserInfo.Image.url ? UserInfo.Image.url : '/avatar.png'} alt="" className='h-full w-full absolute top-0 left-0 z-20 object-contain'/> 
                                <div className='grid items-center text-center align-middle bg-black text-white opacity-60 h-full w-full cursor-pointer z-30 absolute top-0 left-0'>
                                    <div className=''>
                                        <i className="far fa-image text-2xl"></i>
                                        <p> Change Image </p>
                                    </div>
                                    
                                </div>
                            </label>
                            <input type="file" id='profile-input' className='h-full w-full cursor-pointer bg-transparent hidden' onChange={myImage => setUserInfo({...UserInfo, Image: {file: myImage.target.files[0], url: URL.createObjectURL(myImage.target.files[0])}})} />
                        </div>
                        <div className='p-1 h-10 w-full text-xs grid justify-center items-center md:w-3/12 lg:w-4/12'> Image must be bellow 1024×1024px. Use PNG, JPG or BMP format.  </div>
                    </div>


                    


                    {/* Profile Name */}
                    {/* Profile Name */}
                    <form className='flex flex-col w-full bg-gray-100 text-black text-sm px-3 py-6 rounded-md mt-4 self-center'>
                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> First name<sup>*</sup> </p>
                            <input name='FirstName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } required/>
                        </div>

                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> Last name<sup>*</sup> </p>
                            <input name='LastName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } required/>
                        </div>

                        <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                            <p className='w-36'> Email </p>
                            <input name='Email' type='email' className='borderoutline-purple-600 border-gray-300  w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } />
                        </div>

                        <submit className='w-full md:w-24 px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-purple-300 hover:text-black hover:border-black hover:shadow-md bg-purple-700 text-white mt-5 self-end rounded-md text-center'>  Save </submit>
                    </form>




                    
                    
                    
                </div>



            }












            {
                !ShowProfile &&

                    
                    <div className="rounded bg-white w-full md:w-7/12 p-6 px-8 flex flex-col">
                        <p className='text-lg font-bold text-black'> Customize your links </p>
                        <p className='text-xs mt-1 text-stone-600'> Add/ Edit/ Remove links bellow and then share all your profiles with the world! </p>
                
                        <div className='w-full mt-6 text-center justify-self-center text-sm border border-purple-700 text-purple-500 cursor-pointer  hover:border-white  hover:bg-purple-700 hover:text-white rounded p-1 hover:scale-105 duration-300' onClick={()=>{ setLinksID([...LinksID, {id:`${Date.now()}`}])}} >  + Add new link  </div>

                    {/* <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <div id='LinkEditContainer'>

                        <SortableContext items={LinksID} strategy={verticalListSortingStrategy}>

                                {LinksID.length > 0 && LinksID.map(e=> 
                                
                                    <LinkContainer key={e.id} LinkID={e.id}  LinksData={LinksData}  setLinksData={setLinksData} setLinksID={setLinksID}  LinksID={LinksID}  /> 
                                    
                                )}

                        </SortableContext>

                            </div>

                    </DndContext> */}





        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="column text-black">
            <SortableContext items={LinksID} strategy={verticalListSortingStrategy}>

                {/* {LinksID.length > 0 && LinksID.map((task) => (
                    <Task key={task.id} id={task.id}  />
                ))} */}

                {LinksID.length > 0 && LinksID.map((e, index)=> 
                    
                    
                    <LinkContainer index={index} key={e.id} id={e.id} LinkID={e.id}  LinksData={LinksData}  setLinksData={setLinksData} setLinksID={setLinksID}  LinksID={LinksID}  /> 
                    
                )}

            </SortableContext>
            </div>
      </DndContext>


                        
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
                <img src={UserInfo.Image.url ? UserInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                <p className='text-sm font-bold mt-3'>  {UserInfo.FirstName} {UserInfo.LastName} </p>
                <p className='text-xs mt-3 mb-4'> {UserInfo.Email} </p>




                {LinksData.length > 0 && LinksData.map(x=>
                    <Link href={x.address ? x.address : ""} target="_blank" className='w-full'> 
                        <div key={x.id} className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                            <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.typeInfo?.type} </span>   </div>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>
                )}




            </div>
        </div>


    }
    </>
  )
}

export default Page