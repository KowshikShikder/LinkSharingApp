'use client'

import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import upload from "@/Lib/upload";

import { useRouter } from 'next/navigation'
import { auth, db } from "@/Lib/firebase";


function SignUp() {

  const router = useRouter();

  const [Img, setImg] = useState('')
  const [FormData, setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    rePassword:""
  })

  const onChangeHandler =(e)=>{
    if(e.target.name == 'image'){
      // setFormData({...FormData,[e.target.name]:e.target.files[0]})
      console.log(e.target.files[0])
    }
    else{
      setFormData({...FormData,[e.target.name]:e.target.value})
    }
    console.log(FormData)
  }




  const [Avatar, setAvatar] = useState({
                                        file: null,
                                        url: "",
                                      });



  const [loading, setLoading] = useState(false);




  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };












  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);




    // VALIDATE INPUTS
    if (!FormData.username || !FormData.email || !FormData.password)
      return alert("Please enter inputs!");


    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", FormData.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return alert("Select another username");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, FormData.email, FormData.password);

      const imgUrl = await upload(Avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username:FormData.username,
        email:FormData.email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      // alert("Account created! You can login now!");
    } catch (err) {
      console.log(err);
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };









  return (
    <div className='grid p-10 relative bg-slate-800 opacity-90 self-center text-slate-100'>
        <form onSubmit={handleRegister}>
            <h2 className='text-center text-xl font-extrabold tracking-wider'> Sign Up </h2>

            <div className='grid grid-flow-col mt-8'>
                <label className="block w-36" htmlFor="email"> User Name: </label>
                <input name="username" type="name" className='p-2 rounded-md outline-none text-black font-bolder' placeholder='Abdullah' onChange={onChangeHandler} required/>
            </div>

            <div className='grid grid-flow-col mt-8'>
                <label className="block w-36" htmlFor="email"> Email: </label>
                <input name="email" type="email" className='p-2 rounded-md outline-none text-black font-bolder' placeholder='abdullah@gmail.com' onChange={onChangeHandler} required/>
            </div>

            <div className='grid grid-flow-col mt-8'>
                <label className="block w-36" htmlFor="password"> Password: </label>
                <input name="password" type="password" className='p-2 rounded-md outline-none text-black font-bolder' placeholder='Type here a password' onChange={onChangeHandler} required/>
            </div>

            <div className='grid grid-flow-col mt-4'>
                <label className="block w-36" htmlFor="password"> Retype Password: </label>
                <input name="rePassword" type="password" className={`p-2 rounded-md outline-none text-black font-bolder ${FormData.rePassword.length > 0 && FormData.password != FormData.rePassword ? "border-2 border-red-700" : "" } `} placeholder='Re-type here the password' onChange={onChangeHandler} required/>
            </div>


            <div className='grid gap-3 mt-4'>
                <label className="" htmlFor="image"> Choose an Image: </label>
                <img src={`${Avatar.url ? Avatar.url : '/avatar.png'}`} alt="Avatar"  className='h-28 w-h-28' />
                <input name="image" type="file" className='p-1 rounded-md outline-none text-black font-bolder bg-white' placeholder='Set a profile Picture' onChange={handleAvatar} required/>
            </div>
            
            {loading ? 
              <div className="absolute top-0 left-0 grid justify-center text-center items-center m-auto h-full w-full bg-slate-500 bg-opacity-70">
                <h2 className="text-2xl bolder"> Loading... </h2>
              </div>
             :"" }

            <button type="submit" className='m-auto block py-2 px-6 mt-8 mb-4 rounded bg-sky-600 hover:bg-sky-700'> Sign Up </button>

            <h3> Already have an account? </h3>
            <button  onClick={()=> router.push('/Login')} className='m-auto block py-2 px-6 mt-8 mb-4 rounded text-red-700'> Login </button>
        </form>
    </div>
  )
}

export default SignUp




