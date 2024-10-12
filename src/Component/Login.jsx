'use client'


import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { updateUser, updateUserInfoSingle, updateUserInfoBatch } from "@/Reducers/EmployeeInfo/emloyeeSlice";
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation'
import { auth, db } from '@/Lib/firebase';




function Login() {

  const router = useRouter();

  const dispatch = useDispatch();
  const UserInfo = useSelector((state) => state.User.UserInfo);






  useEffect(() => {
   
    auth.onAuthStateChanged(async(user)=> {
      
      if(user?.uid){
        router.push("/")
      }
    })


    UpdateUser()


  }, [onAuthStateChanged])










  const [FormData, setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    rePassword:""
  })

  const [loading, setLoading] = useState(false);


  const onChangeHandler =(e)=>{

    setFormData({...FormData,[e.target.name]:e.target.value})
    console.log(FormData)

  }




  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      await signInWithEmailAndPassword(auth, FormData.email, FormData.password);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };







  // Update User
  // Update User
  const UpdateUser = async()=>{


    // Get Current User & Set in Reducer

    auth.onAuthStateChanged(async(user)=> {

      if (user) {

        // User is signed in.
        console.log(`User is signed in with email ${auth.currentUser.email}`);



        //  Get User ID
        const currentUserID = auth.currentUser.uid;


        if (!currentUserID) return dispatch(updateUserInfoBatch({ currentUser: null, isLoading: false }))


        try {
          const docRef = doc(db, "users", currentUserID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            return  dispatch(updateUserInfoBatch({ currentUser: docSnap.data(), isLoading: false }))
          } else {
            return dispatch(updateUserInfoBatch({ currentUser: null, isLoading: false }))
          }
        } catch (err) {
          console.log(err);
          return dispatch(updateUserInfoBatch({ currentUser: null, isLoading: false }))
        }



      } else {
        // No user is signed in.
        console.log('No user is signed in.');
        dispatch(updateUserInfoBatch({ currentUser: null, isLoading: false }))
      }
    });
  }










    const handleSignOut = async () => {
      try {
        await auth.signOut();
        console.log('User signed out successfully!');
      } catch (error) {
        console.error('Sign Out Error', error);
      }
    };








  return (
    <div className='grid relative p-10 bg-slate-800 w-96 opacity-90 self-center text-slate-100'>
        <form action="">
            <h2 className='text-center text-xl font-extrabold tracking-wider'> Login </h2>

            <div className='grid gap-4 mt-8'>
                <label htmlFor="email" className=''> Email: </label>
                <input type="email" className='p-2 rounded-md outline-none text-black font-bolder opacity-100' placeholder='abdullah@gmail.com' name='email' onChange={onChangeHandler}/>
            </div>

            <div className='grid gap-4 mt-8'>
                <label htmlFor="email" className=''> Password: </label>
                <input type="password" className='p-2 rounded-md outline-none text-black font-bolder opacity-100' placeholder='Type here password' name='password' onChange={onChangeHandler}/>
            </div>


            {loading ?
              <div className="absolute top-0 left-0 grid justify-center text-center items-center m-auto h-full w-full bg-slate-500 bg-opacity-70">
                <h2 className="text-2xl bolder"> Loading... </h2>
              </div>
             :"" }


            <button className='m-auto block py-2 px-6 mt-8 mb-4 rounded bg-sky-600 hover:bg-sky-700' onClick={handleLogin}> Login </button>
        </form>


        <div>
        {UserInfo?.currentUser?.id ? 
          <button  className='m-auto block py-2 px-6 mt-8 mb-4 rounded bg-sky-600 hover:bg-sky-700' onClick={handleSignOut}> Logout </button> : <button  className='m-auto block py-2 px-6 mt-8 mb-4 rounded bg-sky-600 hover:bg-sky-700' onClick={()=> router.push('/SignUp')}> Create Account </button>
        }
        </div>
        

    
    {UserInfo && console.log(UserInfo)}


    </div>
  )
}

export default Login