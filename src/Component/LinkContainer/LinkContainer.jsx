'use client'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react'



function LinkContainer(props) {

    const {LinkID, LinksData, setLinksData, setLinksID, LinksID, id, index} = props;











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









    const LinkHandler =(uid, Names, info, typeInfo)=>{


        if(LinksData.length > 0){
            const StoredLinksID = LinksData.map(m=> m.id)

            console.log("StoredLinksID")
            console.log(StoredLinksID)

            if(StoredLinksID.includes(uid)){
                

                let restData = LinksData.filter(f=> f.id != uid)
                let particularData = LinksData.filter(f=> f.id == uid)
                
                var thisData;
                if(typeInfo){   thisData = {...particularData[0],[Names]:info, typeInfo}}
                else{   thisData = {...particularData[0],[Names]:info}}
                

                setLinksData([...restData, thisData])

                console.log("I am here in 2nd if")
            }
            else{
                let thisData = {name:info, id: uid, typeInfo}
                setLinksData([...LinksData, thisData])

                console.log("I am here in 2nd else")

            }
        }
        else{
            let thisData = {name:info, id: uid, typeInfo}
            setLinksData([...LinksData, thisData])
            console.log("I am here in 1st else")
        }

        


        console.log(LinksData)

    }







    const GetAdressValidation=(LinkID)=>{
        try {
            const GivenLinkPart1 =  new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address)?.origin?.split(".")[new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address).origin.split(".").length-2]
            const GivenLinkPart2 =  new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address)?.origin?.split(".")[new URL(LinksData.filter(f=> f.id == LinkID)[0]?.address).origin.split(".").length-1]
            var combinedLink = `${GivenLinkPart1}.${GivenLinkPart2}`

            const validationLink = LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo?.Validation;
            console.log('validationLink')
            console.log(validationLink)
            console.log('combinedLink')
            console.log(combinedLink)


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









 


const [LinkDetails, setLinkDetails] = useState(
    {
        type:"",
        address:"",
        id: LinkID
    }
)










const { attributes, listeners, setNodeRef, transform, transition } =
useSortable({ id });

const style = {
transition,
transform: CSS.Transform.toString(transform),
};






  return (
        <div  style={style} className='w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center' id="">
            <div className='flex justify-between'> 
                <div ref={setNodeRef} {...attributes} {...listeners} style={{touchAction:'none'}}>
                    <span className='text-3xl'> = </span><span> link #</span><span>{index+1}</span>
                </div>
                
                <div className='cursor-pointer py-1 px-2 text-sm' onClick={()=> {setLinksData([...LinksData.filter(f=> f.id != LinkID)]);   setLinksID([...LinksID.filter(d=> d.id !== LinkID)]); console.log(LinksID, LinkID)  }} >Remove</div>
            </div>

            <p className='pt-3'> Platform </p>

            <div className='relative'>
                <p className='bg-white border border-stone-400 w-full px-3 py-2 rounded'  onClick={(e)=> {e.target.nextElementSibling.classList.remove("hidden");  }}> {LinksData.filter(f=> f.id == LinkID)[0]?.name ? LinksData.filter(f=> f.id == LinkID)[0]?.name : "Choose Platform" }  </p>
                <div className='absolute z-20 hidden w-full bg-white mt-1 border border-stone-500'>
                    {LinkInfo.map(info=> 
                        <p className='cursor-pointer py-2 hover:bg-slate-600 hover:text-white border-t px-3' onClick={(e)=> { e.target.parentElement.previousSibling.innerHTML=  `<i className="fab ${info.icon} mr-1"> </i>  ${info.type}`; setLinkDetails({...LinkDetails, type: info.type, typeInfo:info}); LinkHandler(LinkID, "type", info.type, info);  e.target.parentElement.classList.add("hidden")   } } > <i className={`fab ${info.icon} mr-1`}></i>  {info.type} </p>    
                    )}
                </div>
            </div>





            {/* animation: {
                        shake:'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
                              },
                                    keyframes: {
                                            shake : {
                                                      '10%, 90%': {
                                                                    transform: 'translate3d(-1px, 0, 0)'
                                                                              },
                                                                                        '20%, 80%': {
                                                                                                      transform: 'translate3d(2px, 0, 0)'
                                                                                                                },
                                                                                                                          '30%, 50%, 70%': {
                                                                                                                                        transform: 'translate3d(-4px, 0, 0)'
                                                                                                                                                  },
                                                                                                                                                            '40%, 60%': {
                                                                                                                                                                          transform: 'translate3d(4px, 0, 0)'
                                                                                                                                                                                    }
            } */}








            <p className='mt-3'> Link </p>
            <div className='relative'>
                <input type='text' defaultValue={LinksData.filter(f=> f.id == LinkID)[0]?.address ? LinksData.filter(f=> f.id == LinkID)[0]?.address : ""} name='address' className='border border-stone-400 w-full px-3 py-2 rounded pl-8' onChange={test=> {setLinkDetails({...LinkDetails, address: test.target.value}); console.log(LinkDetails); console.log(LinkID); LinkHandler(LinkID, test.target.name, test.target.value);   } } />
                <i className="fas fa-link absolute left-3 top-3"></i>
                
                {LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo && LinksData.filter(f=> f.id == LinkID)[0]?.address?.length > 5 && !GetAdressValidation(LinkID) &&
                 <div className='bg-red-600 px-2 text-center rounded mt-1 py-2 text-white w-40 text-xs'> Link of <span className='font-bold uppercase'>'{LinksData.filter(f=> f.id == LinkID)[0]?.typeInfo?.type}'</span>  is not appropiete. </div>
                }
             </div>
        </div>
  )
}

export default LinkContainer