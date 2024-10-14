'use client'

import { db } from "@/Lib/firebase";
import copy from "copy-to-clipboard";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";






export default function Page({ params }) {

// Get Id from Params
    const UserID = params.ProfileID;
    
    
    
    // IF id Found Search it
    useEffect(() => {
            if(UserID){
                UpdateUser()
            }
        }, [UserID])











    // user info state
    // user info state

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


// links Data stats
// links Data stats
    const [LinksData, setLinksData] = useState([])
    const [LinksID, setLinksID] = useState([])
    const [Loading, setLoading] = useState("Loading")












    // Fetch Data From Database
    // Fetch Data From Database
    const UpdateUser = async()=>{
    

        // setloading
        setLoading("Loading")
    

        // Fetch Data
        if (UserID) {
            try {
            const docRef = doc(db, "users", UserID);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
    
                let FetchedData = docSnap.data();
    

                // Store Data in local States
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
    

                // if found set state found
                if(FetchedData.LinksIdContainer.length > 0){
                    setLoading("Found")
                }
            
                return  console.log(docSnap.data())
            } else {
                // if data not found set state not found
                setLoading("Not Found")
                return console.log("No User data")
            }
            } catch (err) {
            setLoading("Not Found")
            console.log(err);
            return  console.log("No User")
            }
    
    
    
        } else {
                setLoading("Not Found")
                console.log('No user is signed in.');
        }
    }

    
    
    
    
    
    
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



    
    




return (
    <>
    
    {UserInfo && 



    <div className='flex flex-col bg-white justify-center items-center px-6'>

        <div className='bg-blue-600 h-52 w-full overflow-hidden absolute top-0 rounded-b-3xl'></div>




        <div className='p-2 px-6 w-full shadow z-20 bg-white flex h-14 items-center justify-between mt-4 mx-8 rounded-md'> 
            
            
            <div className="left-section flex">
                <img src="https://firebasestorage.googleapis.com/v0/b/linksharingapp-de794.appspot.com/o/Static%20Images%2FKahf%20Logo.jpg?alt=media&token=f019d938-ff8a-4d11-be00-e47e983db21e" alt="Lgog" className='h-6 w-6 mr-2' />
                <p className='hidden md:block text-black font-extrabold'> devlinks </p>
            </div>

            <div className='text-xs md:text-sm border hover:border-blue-700 hover:text-blue-700 hover:bg-white border-black  bg-blue-700 text-white rounded p-1 px-3 md:px-6 cursor-pointer hover:scale-105 duration-300' onClick={(e)=> copyToClipboard(e)}> Share link </div>
        </div>







        

        {/* Mobile Holder Section */}
        {/* Mobile Holder Section */}

        <div className='bg-white shadow-md border text-black border-black z-20 my-20 rounded-3xl w-60 px-8 py-8 flex flex-col items-center' style={{minHeight:"420px"}}>  
            <img src={UserInfo.Image.url ? UserInfo.Image.url : 'https://firebasestorage.googleapis.com/v0/b/linksharingapp-de794.appspot.com/o/Static%20Images%2Fprofile%20icon.png?alt=media&token=5f4f2b88-e2d9-4483-a779-53f20053b9ef'} alt="" className='h-16 w-16 rounded-full border-purple-800 border-2' />
            <p className='text-sm font-bold mt-3'>  {UserInfo.FirstName} {UserInfo.LastName} </p>
            <p className='text-xs mt-3 mb-4'> {UserInfo.Email} </p>






            {
            Loading == "Loading" ? 
                <div className="h-36 w-full mt-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/linksharingapp-de794.appspot.com/o/Static%20Images%2FLoading.gif?alt=media&token=93ae5e9f-4240-4eb0-92f6-86d0ce725baa" alt="" className="h-full w-full object-cover" />
                    <p className="text-center font-bold mt-4">Loading...</p>
                </div>

            :

            Loading == "Found" ?
                LinksData.length > 0 && LinksData.map(x=>
                    <Link key={x.id} href={x.address ? x.address : ""} target="_blank" className='w-full'> 
                        <div className={`flex text-white text-xs font-extralight mt-3 h-10 justify-between items-center ${x.typeInfo?.color} px-4 rounded-md w-full hover:scale-105 duration-300 cursor-pointer hover:shadow-md`}>
                            <div>   <i className={`fab ${x.typeInfo?.icon} mr-1`}></i>  <span> {x.typeInfo?.type} </span>   </div>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>
                )

            :
                <div className="h-36 w-full mt-6">
                    <img src="https://firebasestorage.googleapis.com/v0/b/linksharingapp-de794.appspot.com/o/Static%20Images%2FNotFound.gif?alt=media&token=273a5410-18fc-4d0a-9f98-71d49e51c86f" alt="" className="h-full w-full object-cover" />
                    <p className="text-center font-bold mt-4">Not Found</p>
                </div>
            }





        </div>
    </div>


    }
</>
)
}






