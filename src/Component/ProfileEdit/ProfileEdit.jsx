import React from 'react'

function ProfileEdit(props) {

    const {setuserInfo, userInfo} = props;

  return (
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
  )
}

export default ProfileEdit