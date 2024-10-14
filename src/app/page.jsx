'use client'

import LinkContainer from '@/Component/LinkContainer/LinkContainer'
import { auth, db } from '@/Lib/firebase'
import upload from '@/Lib/upload'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import copy from 'copy-to-clipboard'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {  doc, getDoc,  setDoc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'




function Page() {


    const [ShowProfile, setShowProfile] = useState(true)
    const [ShowPreview, setShowPreview] = useState(false)
    const [CreateUser, setCreateUser] = useState(false)
    const [HaveAccount, setHaveAccount] = useState(false)
    const [Loading, setLoading] = useState({
                                                state:true,
                                                message:"Loading..."
                                            });

    // User Info
    const [UserInfo, setUserInfo] = useState(
                                                {
                                                    FirstName:"",
                                                    LastName:"",
                                                    Email:"",
                                                    Image:{
                                                        file: null,
                                                        url: null,
                                                    },
                                                    Password:"",
                                                    userID:""
                                                }
                                            )


    // links Informations
    const [LinksData, setLinksData] = useState([])
    const [LinksID, setLinksID] = useState([])
    



    // User Authentication
    // User Authentication
    useEffect(() => {

        setLoading({state:true, message:"User Updating"})

        auth.onAuthStateChanged(async(user)=> {
            
            if(user?.uid){
                console.log(user.uid)
                UpdateUser()
            }
            else{
                setLoading({state:false})

            }

            setLoading({state:false, message:"User Updated"})

        })
        }, [onAuthStateChanged])




    // Login Handler
    // Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading({state:true, message:"Loging In"})
    
    
        try {
            await signInWithEmailAndPassword(auth, UserInfo.Email, UserInfo.Password);
            
            setLoading({state:false, message:"Loged In"})
            
        } catch (err) {
            setLoading({state:false, message:"Login Failed"})
            console.log(err);
        } finally {
            setLoading(false);
        }
    };



  // Update User & Fetch Data
  // Update User & Fetch Data
  const UpdateUser = async()=>{

    setLoading({state:true, message:"Updating User"})



    auth.onAuthStateChanged(async(user)=> {

      if (user) {
        // User is signed in.
        console.log(`User is signed in with email ${auth.currentUser.email}`);



        //  Get User ID
        const currentUserID = auth.currentUser.uid;


        setLoading({state:true, message:"Fetching Data"})
        // Fetch Data from database
        try {
          const docRef = doc(db, "users", currentUserID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            let FetchedData = docSnap.data();


            setLoading({state:true, message:"Updating Local States"})
            // Store Data in Local State
            setUserInfo( 
                            {
                                FirstName:  FetchedData.firstName,
                                LastName:   FetchedData.lastName,
                                Email:  FetchedData.email,
                                userID:  FetchedData.userId,
                                Image:{
                                    file: null,
                                    url: FetchedData.avatar,
                                }
                            }
                        )

            setLinksID(FetchedData.LinksIdContainer);
            setLinksData(FetchedData.LinksContainer);

            setLoading({state:false})


            return  console.log(docSnap.data())
          } else {
            setLoading({state:false, message:"No Data found"})
            return console.log("No User data")
          }
        } catch (err) {
          console.log(err);
          setLoading({state:false, message:"No User found"})
          return  console.log("No User")
        }



      } else {
        // No user is signed in.
        setLoading({state:false, message:"No User found"})
        console.log('No user is signed in.');
      }
    });
  }














            



    // Drag & Drop Functions
    // Drag & Drop Functions
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
        );
    

    const getTaskPos = (id) => LinksID.findIndex((task) => task.id === id);
    const getTaskPos2 = (id) => LinksData.findIndex((task) => task.id === id);


    const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (active.id === over.id) return;


        // Reorder Links
        setLinksData((LinksData) => {
        const originalPos2 = getTaskPos2(active.id);
        const newPos2 = getTaskPos2(over.id);
        return arrayMove(LinksData, originalPos2, newPos2);
        });


        // Reorder Link Ids
        setLinksID((LinksID) => {
        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);
    
        return arrayMove(LinksID, originalPos, newPos);
        });

    };






    // Copy to Clipboard
    // Copy to Clipboard
    const copyToClipboard =(e)=>{

        if(UserInfo.userID){

            var copyText = `${window.location.origin}/Profile/${UserInfo.userID}`
            copy(copyText);
            e.target.innerHTML = `Copid  <i class="ml-2 far fa-clipboard"></i>`;


            setTimeout(() => {
                e.target.innerHTML = `Share link`;
            }, 2000);

        }
        else{
            alert("Please Save your information!")
        }

    }
            



    // Link Validations
    // Link Validations
    const GetAdressValidation=(LinkID)=>{
        try {

            // Check Given URL
            const GivenLinkPart1 =  new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address)?.origin?.split(".")[new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address).origin.split(".").length-2]
            const GivenLinkPart2 =  new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address)?.origin?.split(".")[new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address).origin.split(".").length-1]
            var combinedLink = `${GivenLinkPart1.replace("https://","")}.${GivenLinkPart2}`

            // Validate with stored formate
            const validationLink = LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo?.Validation;


            if(combinedLink == validationLink){
                return true
            }
            else{
                return false
            }


        } catch (error) {
            console.log(error)
            return false
        }
    }




            
            
            
    






    const handleRegister = async (e) => {
        e.preventDefault();
        
        setLoading({state:true, message:"Saving Data"})



                                                                                        
        setLoading({state:true, message:"Checking Informations"})

        // Checking password
        if(!UserInfo.Password && UserInfo.userID == "" && CreateUser && !UserInfo.Email)
            return alert("Please enter Email & Password!");

        // Checking password
        if(!UserInfo.Password && HaveAccount && !UserInfo.Email)
            return alert("Please enter Email & Password!");


        // VALIDATE INPUTS
        if (!UserInfo.FirstName || !UserInfo.LastName )
            return alert("Please enter inputs!");


        // Checking urls
        if (!LinksID.length > 0 || !LinksData.length > 0 )
            return alert("Select Atleast One Link!");

        // VALIDATE urls
        if(LinksData.map(e=> GetAdressValidation(e.id)).includes(false))
            return alert("Please Check your urls!");


        
        try {

            // Create ID If user Wants 
            if(CreateUser && !auth.currentUser?.uid){

                setLoading({state:true, message:"Checking ID"})
                
                    var res = await createUserWithEmailAndPassword(auth, UserInfo.Email, UserInfo.Password);

                setLoading({state:true, message:"ID Created"})

            }



            // Upload Image if Image Given
            var imgUrl;
            if(UserInfo.Image.file){
                setLoading({state:true, message:"Uploading Image"})
                imgUrl = await upload(UserInfo.Image.file);
                setLoading({state:true, message:"Image Uploaded"})
            }
            


            
            // Store or Update Data to Database
            // Store or Update Data to Database
            if(UserInfo.userID == ""){

                setLoading({state:true, message:"Storing Data"})


                    var newGaneratedID = CreateUser ? res.user.uid : `${UserInfo.FirstName}-${Date.now()}`;
                        
                    await setDoc(doc(db, "users", newGaneratedID), {
                        firstName:UserInfo.FirstName,
                        lastName:UserInfo.LastName,
                        email:UserInfo.Email,
                        avatar: imgUrl == null ? "" : imgUrl,
                        userId: newGaneratedID,
                        LinksIdContainer: LinksID,
                        LinksContainer: LinksData,
                    });   

                    
                    setLoading({state:true, message:"Updating User ID"})
                    
                    setUserInfo(  {...UserInfo, userID:  newGaneratedID})
                    console.log("Data Stored")

                }
            
                else{

                    setLoading({state:true, message:"Updating Data"})

                    await updateDoc(doc(db, "users",  UserInfo.userID), {
                            firstName:UserInfo.FirstName,
                            lastName:UserInfo.LastName,
                            email:UserInfo.Email,
                            avatar: imgUrl ? imgUrl : UserInfo.Image.url,
                            userId: UserInfo.userID,
                            LinksIdContainer: LinksID,
                            LinksContainer: LinksData,
                        })
                        

                        setLoading({state:true, message:"Data Updated"})

                }



                setLoading({state:false})

            
        } catch (err) {
            setLoading({state:false})
            console.log(err);

        } finally {
            setLoading({state:false})
        }
    };




    

  return (

    <>
    {Loading.state && 
        <div className="bg-black w-full h-full select-none touch-none fixed top-0 left-0 z-50 bg-opacity-60 flex items-center justify-center align-middle">
            <div className="h-48 w-48 m-auto z-50">
                <img src="/Loading.gif" alt="" className="h-full w-full object-cover" />
                <p className="text-center font-bold mt-4 text-white text-xl">{Loading.message}</p>
            </div>
            <div className="w-full h-full fixed bg-black top-0 left-0 z-40 blur-lg bg-opacity-40"></div>
        </div>
    }


    {!ShowPreview && 

        <div>

            {/* Topbar  */}
            {/* Topbar  */}
            <div className='p-2 px-6 w-full shadow bg-white flex h-14 items-center justify-between'> 

                {/* logo Section */}
                <div className="left-section flex">
                    <img src="/Kahf Logo.jpg" alt="Lgog" className='h-6 w-6 mr-2' />
                    <p className='hidden md:block text-black font-extrabold'> devlinks </p>
                </div>

                {/* togglable Tink Section */}
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

                {/* Preview Section */}
                <div className="right-section" onClick={e=> setShowPreview(true)}>
                    <span className='block md:hidden'> <i className="far fa-eye border border-purple-700 text-purple-500 hover:border-black  hover:bg-purple-700 hover:text-white rounded p-2 px-3 cursor-pointer hover:scale-105 duration-300"></i></span>
                    <div className='hidden md:block text-sm border border-purple-700 text-purple-500 hover:border-black  hover:bg-purple-700 hover:text-white rounded p-1 px-6 cursor-pointer hover:scale-105 duration-300'> Preview </div>
                </div>
            </div>




            

            {/* Main Section */}
            {/* Main Section */}
            <div className='bg-gray-100 flex p-4'>



                {/* Mobile Preview Sections */}
                {/* Mobile Preview Sections */}
                <div className="hidden w-5/12 rounded md:grid items-start py-20 overflow-hidden  justify-center bg-white mr-4">


                    <div className='border text-black border-black rounded-3xl w-52 px-4 py-8 flex flex-col items-center' style={{minHeight:"420px"}}>  
                        
                        {/* User Profile */}
                        <img src={UserInfo.Image.url ? UserInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                        <p className='text-sm font-bold mt-3'> {UserInfo.FirstName} {UserInfo.LastName} </p>
                        <p className='text-xs mt-3 mb-4'> {UserInfo.Email} </p>


                        {/* User Links */}
                        {LinksData.length > 0 && LinksData.map(x=>
                            <Link key={x.id} href={x.address ? x.address : ""} target="_blank" className='w-full'> 
                                <div className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                                    <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.typeInfo?.type} </span>   </div>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>








                {
                    ShowProfile &&
                    
                    
                    //  Profile Edit Section
                    //  Profile Edit Section
                    <div className="rounded bg-white w-full md:w-7/12 p-6 px-8  flex flex-col">
                        <p className='text-lg font-bold text-black'> Profile Details </p>
                        <p className='text-xs mt-1 text-stone-600'> Add your details to create a personal touch to ypur profile. </p>
                



                        {/* Profile Image Edit */}
                        {/* Profile Image Edit */}
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


                        


                        {/* Profile Info Edit */}
                        {/* Profile Info Edit */}
                        <form className='flex flex-col w-full bg-gray-100 text-black text-sm px-3 py-6 rounded-md mt-4 self-center'>
                            

                            {/* Name & Email */}
                            {(!HaveAccount || auth.currentUser?.uid) &&
                            <>
                                <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                                    <p className='w-36'> First name<sup>*</sup> </p>
                                    <input defaultValue={UserInfo.FirstName} name='FirstName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } required/>
                                </div>

                                <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                                    <p className='w-36'> Last name<sup>*</sup> </p>
                                    <input defaultValue={UserInfo.LastName} name='LastName' type='text' className='border outline-purple-600 border-gray-300 w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } required/>
                                </div>
                            </>
                            }

                            <div className='flex flex-col md:flex-row w-full  mt-4 justify-between'>
                                <p className='w-36'> Email </p>
                                <input defaultValue={UserInfo.Email} name='Email' type='email' className='border outline-purple-600 border-gray-300  w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } />
                            </div>


                            {/* Password */}
                            {(CreateUser || HaveAccount) &&
                                <div className={`flex flex-col md:flex-row w-full  mt-4 justify-between`}>
                                    <p className='w-36'> Password </p>
                                    <input defaultValue={UserInfo.Password} name='Password' type='password' className='border outline-purple-600 border-gray-300  w-full px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } />
                                </div>
                            }


                            {/* Account Create */}
                            {!HaveAccount && !UserInfo.userID &&
                                <div className='flex justify-start align-baseline items-center text-left w-full ml-4 mt-4'>
                                    <input defaultChecked={CreateUser} onClick={()=> setCreateUser(prev=> !prev)} type='checkbox' className='border h-5 w-5 outline-purple-600 border-gray-300  px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } />
                                    <p className='inline-block ml-6 self-start'> Create Account? </p>
                                </div>
                            }


                            {/* Login & Signout Account */}
                            {!CreateUser && !UserInfo.userID &&
                                <div className='flex justify-start align-baseline items-center text-left w-full ml-4 mt-4'>
                                    <input defaultChecked={HaveAccount} onClick={()=> {setHaveAccount(prev=> !prev); HaveAccount && setCreateUser(false)}} type='checkbox' className='border h-5 w-5 outline-purple-600 border-gray-300  px-3 py-2 rounded pl-8' onChange={data=> setUserInfo({...UserInfo,[data.target.name]:data.target.value}) } />
                                    <p className='inline-block ml-6 self-start'> Have an Account? </p>
                                </div>
                            }

                            {HaveAccount && !auth.currentUser?.uid  && <div className='w-full md:w-24 px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-blue-300 hover:text-black hover:border-black hover:shadow-md bg-blue-700 text-white mt-5 self-center rounded-md text-center' onClick={handleLogin}>  Login  </div>}


                            {/* Data Save or Update */}
                            <div className='w-full md:w-24 px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-purple-300 hover:text-black hover:border-black hover:shadow-md bg-purple-700 text-white mt-5 self-end rounded-md text-center' onClick={e=>{LinksID.length < 1 || LinksData[0]?.typeInfo == null ? setShowProfile(prev=> !prev) : handleRegister(e)}}>    {LinksID.length < 1 || LinksData[0]?.typeInfo == null ? 'Next' : UserInfo.userID !=="" ? 'Update' : "Save" }  </div>
                            
                            
                            {auth.currentUser?.uid  &&  <div className='w-full md:w-24 px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-orange-300 hover:text-black hover:border-black hover:shadow-md bg-orange-700 text-white mt-5 self-center rounded-md text-center' onClick={()=>  auth.signOut()}>  Sign Out  </div>}
                        
                        </form>


                        
                    </div>



                }










                {/* Link Edit Section */}
                {/* Link Edit Section */}
                
                {
                    !ShowProfile &&

                        
                        <div className="rounded bg-white w-full md:w-7/12 p-6 px-8 flex flex-col">
                            <p className='text-lg font-bold text-black'> Customize your links </p>
                            <p className='text-xs mt-1 text-stone-600'> Add/ Edit/ Remove links bellow and then share all your profiles with the world! </p>
                    

                            {/* Add New Link */}
                            <div className='w-full mt-6 text-center justify-self-center text-sm border border-purple-700 text-purple-500 cursor-pointer  hover:border-white  hover:bg-purple-700 hover:text-white rounded p-1 hover:scale-105 duration-300' onClick={()=>{ setLinksID([...LinksID, {id:`${Date.now()}`}])}} >  + Add new link  </div>






                                {/* Link Edit And Drag & Drop */}
                                {/* Link Edit And Drag & Drop */}
                                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                    <div className="column text-black">
                                        <SortableContext items={LinksID} strategy={verticalListSortingStrategy}>

                                            {LinksID.length > 0 && LinksID.map((e, index)=> 
                                                <LinkContainer index={index} key={e.id} id={e.id} LinkID={e.id}  LinksData={LinksData}  setLinksData={setLinksData} setLinksID={setLinksID}  LinksID={LinksID}  /> 
                                            )}

                                        </SortableContext>
                                    </div>
                                </DndContext>


                                {/* Store or Update Data */}
                                <div className='px-5 py-2 hover:scale-105 duration-300 cursor-pointer hover:bg-purple-300 hover:text-black hover:border-black bg-purple-700 text-white w-24 mt-3 self-end rounded-md text-center'  onClick={e=>{UserInfo.FirstName == "" && UserInfo.LastName == "" ? setShowProfile(prev=> !prev) : handleRegister(e)}}>  {UserInfo.FirstName == "" && UserInfo.LastName == "" ? "Next" :  UserInfo.userID !=="" ? 'Update' : "Save"} </div>
                            
                            </div>
                }                                                                                           



            </div>
        </div>
    }




    {/* Preview Sectiopn */}
    {/* Preview Sectiopn */}
    {ShowPreview && 



        <div className='flex flex-col bg-white justify-center items-center px-6'>

            {/* Background Styling */}
            <div className='bg-blue-600 h-52 w-full overflow-hidden absolute top-0 rounded-b-3xl'>            
            </div>



            {/* Preview Bar */}
            <div className='p-2 px-6 w-full shadow z-20 bg-white flex h-14 items-center justify-between mt-4 mx-8 rounded-md'> 
                    <div className='text-xs md:text-sm border border-blue-700 text-blue-700 hover:border-black  hover:bg-blue-700 hover:text-white rounded p-1 px-3 md:px-6 cursor-pointer hover:scale-105 duration-300' onClick={e=> setShowPreview(false)}> Back to editor </div>

                    <div className='text-xs md:text-sm border hover:border-blue-700 hover:text-blue-700 hover:bg-white border-black  bg-blue-700 text-white rounded p-1 px-3 md:px-6 cursor-pointer hover:scale-105 duration-300' onClick={(e)=> copyToClipboard(e)}> Share link </div>
            </div>







            {/* Mobile Holder Section */}
            {/* Mobile Holder Section */}
            <div className='bg-white shadow-md border text-black border-black z-20 mt-20 rounded-3xl w-60 px-8 py-8 flex flex-col items-center' style={{minHeight:"420px"}}>  
                
                {/* User Info */}
                <img src={UserInfo.Image.url ? UserInfo.Image.url : '/avatar.png'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
                <p className='text-sm font-bold mt-3'>  {UserInfo.FirstName} {UserInfo.LastName} </p>
                <p className='text-xs mt-3 mb-4'> {UserInfo.Email} </p>



                {/* User Links */}
                {LinksData.length > 0 && LinksData.map(x=>
                    <Link key={x.id} href={x.address ? x.address : ""} target="_blank" className='w-full'> 
                        <div className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
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