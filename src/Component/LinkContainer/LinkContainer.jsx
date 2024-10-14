'use client'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react'



function LinkContainer(props) {


    // Props From Parent 
    const {LinkID, LinksData, setLinksData, setLinksID, LinksID, id, index} = props;



    // Platform Name, icon, color and validation
    // Platform Name, icon, color and validation
    const [LinkInfo, setLinkInfo] = useState([
        {
            type:"Github",
            icon:"fa-github",
            Validation:"github.com",
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








    // Link Handler
    // Link Handler
    const LinkHandler =(uid, Names, info, typeInfo)=>{


        // if already link stored
        if(LinksData.length > 0){

            // get all ids of stored links

            const StoredLinksID = LinksData.map(m=> m.id)


            // Check if Current ID already stored
            if(StoredLinksID.includes(uid)){
                let restData = LinksData.filter(f=> f.id != uid)
                let particularData = LinksData.filter(f=> f.id == uid)
                
                var thisData;
                if(typeInfo){   thisData = {...particularData[0],[Names]:info, typeInfo}}
                else{   thisData = {...particularData[0],[Names]:info}}
                
                // Update Link
                setLinksData([...restData, thisData])
            }
            else{

                // if Current ID is new  store it
                let thisData = {name:info, id: uid, typeInfo}
                setLinksData([...LinksData, thisData])
            }
        }
        else{
            // if no Link Created
            let thisData = {name:info, id: uid, typeInfo}
            setLinksData([...LinksData, thisData])
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







 
// Drag & Drop Functions
// Drag & Drop Functions

const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

const style = {
    transition,
    transform: CSS.Transform.toString(transform),
};






  return (
        <div  style={style} className='w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center'>
            <div className='flex justify-between'> 

                {/* Dragable Area for Drag & Drop */}
                <div ref={setNodeRef} {...attributes} {...listeners} style={{touchAction:'none'}}>
                    <span className='text-3xl'> = </span><span> link #</span><span>{index+1}</span>
                </div>

                {/* Link Remove Button */}
                <div className='cursor-pointer py-1 px-2 text-sm' onClick={()=> {setLinksData([...LinksData.filter(f=> f.id != LinkID)]);   setLinksID([...LinksID.filter(d=> d.id !== LinkID)]); console.log(LinksID, LinkID)  }} >Remove</div>
            </div>

            
            
            <p className='pt-3'> Platform </p>

            {/* Platform Selection */}
            <div className='relative'>
                <p className='bg-white border border-stone-400 w-full px-3 py-2 rounded'  onClick={(e)=> {e.target.nextElementSibling.classList.remove("hidden");  }}> {LinksData.filter(f=> f.id == LinkID)[0]?.name ? LinksData.filter(f=> f.id == LinkID)[0]?.name : "Choose Platform" }  </p>
                <div className='absolute z-20 hidden w-full bg-white mt-1 border border-stone-500'>
                    {LinkInfo.map((info, index)=> 
                        <p key={index} className='cursor-pointer py-2 hover:shadow hover:border hover:bg-slate-600 hover:text-white border-black bg-white  border-t px-3'  onClick={(e)=> { e.target.parentElement.previousSibling.innerHTML=  `<i className="fab ${info.icon} mr-1"> </i>  ${info.type}`; LinkHandler(LinkID, "type", info.type, info);  e.target.parentElement.classList.add("hidden")   } } > <i className={`fab ${info.icon} mr-1`}></i>  {info.type} </p>    
                    )}
                </div>
            </div>


            {/* platform Adress */}
            <p className='mt-3'> Link </p>
            <div className='relative'>
                <input type='text' defaultValue={LinksData.filter(f=> f.id == LinkID)[0]?.address ? LinksData.filter(f=> f.id == LinkID)[0]?.address : ""} name='address' className='border border-stone-400 w-full px-3 py-2 rounded pl-8' onChange={test=> { console.log(LinkID); LinkHandler(LinkID, test.target.name, test.target.value);    }} />
                <i className="fas fa-link absolute left-3 top-3"></i>
                
                {LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo && !GetAdressValidation(LinkID) &&
                 <div className='bg-red-600 px-2 text-center rounded mt-1 py-2 text-white w-56 text-xs'> Link of <span className='font-bold uppercase italic'> {LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo?.type} </span>  is not appropriate. </div>
                }
             </div>
        </div>
  )
}

export default LinkContainer