"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
  const router = useRouter();
  const [user,setUser] = useState({username:"",email:"",password:""})
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const resp =  await axios.post("/api/users/signup",user);
      console.log(resp);
      router.push("/login")
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false)
    else 
      setButtonDisabled(true)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">{!loading ? "Signup" : "Processing"}</h1>
      <br/>

      <label htmlFor="username">Username</label>
      <input className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text" id="username" value={user.username} onChange={(e) => setUser({...user,username: e.target.value})} placeholder="Username"
      />

      <hr/>
      <label htmlFor="email">Email</label>
      <input className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text" id="email" value={user.email} onChange={(e) => setUser({...user,email: e.target.value})} placeholder="Email"
      />

      <hr/>
      <label htmlFor="password">Password</label>
      <input className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text" id="password" value={user.password} onChange={(e) => setUser({...user,password: e.target.value})} placeholder="Password"
      />

      <button 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={onSignup}>
        {buttonDisabled ? "No Signup" : "Signup Now"}
      </button>
      <Link href="/login">Already have an account ?</Link>
    </div>
  )
}