'use client'
import React, { useState } from 'react'



function LinkContainer(props) {

    const {LinkID, LinksData, setLinksData} = props;



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









    const LinkHandler =(uid, Names, info)=>{

        // console.log("Data of Change Data")
        // console.log(info)
        var Name = Names;


        if(LinksData.length > 0){
            const StoredLinksID = LinksData.map(m=> m.id)

            console.log("StoredLinksID")
            console.log(StoredLinksID)

            if(StoredLinksID.includes(uid)){
                

                let restData = LinksData.filter(f=> f.id != uid)
                let particularData = LinksData.filter(f=> f.id == uid)
                let thisData = {...particularData[0], Name:info}
                

                setLinksData([...restData, thisData])

                console.log("I am here in 2nd if")
            }
            else{
                let thisData = {name:info, uid}
                setLinksData([...LinksData, thisData])

                console.log("I am here in 2nd else")

            }
        }
        else{
            let thisData = {name:info, uid}
            setLinksData([...LinksData, thisData])
            console.log("I am here in 1st else")
        }

        


        console.log(LinksData)

    }

















 


const [LinkDetails, setLinkDetails] = useState(
    {
        type:"",
        address:"",
        id: LinkID
    }
)


















  return (
        <div className='w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center' id="">
            <div className='flex justify-between'> 
                <div>
                    <span>=</span><span> link #</span><span>1</span>
                </div>
                <div className='cursor-pointer py-1 px-2 text-sm'>Remove</div>
            </div>

            <p className='pt-3'> Platform </p>

            <div className='relative' >
                <p className='bg-white border border-stone-400 w-full px-3 py-2 rounded'  onClick={(e)=> {e.target.nextElementSibling.classList.remove("hidden");  }}> Choose Platform </p>
                <div className='absolute z-20 hidden w-full bg-white mt-1 border border-stone-500'>
                    {LinkInfo.map(info=> 
                        <p className='cursor-pointer py-2 hover:bg-slate-600 hover:text-white border-t px-3' onClick={(e)=> { e.target.parentElement.previousSibling.innerHTML=  `<i className="fab ${info.icon} mr-1"></i>  ${info.type}`; setLinkDetails({...LinkDetails, type: info.type, typeInfo:info}); LinkHandler(LinkDetails);  e.target.parentElement.classList.add("hidden")   } } > <i className={`fab ${info.icon} mr-1`}></i>  {info.type} </p>    
                    )}
                </div>
            </div>

            <p className='mt-3'> Link </p>
            <div className='relative'>
                <input type='text' name='address' className='border border-stone-400 w-full px-3 py-2 rounded pl-8' onChange={test=> {setLinkDetails({...LinkDetails, address: test.target.value}); console.log(LinkDetails); console.log(LinkID); LinkHandler(LinkID, test.target.name, test.target.value);   } } />
                <i className="fas fa-link absolute left-3 top-3"></i>
            </div>
        </div>
  )
}

export default LinkContainer