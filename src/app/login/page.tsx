"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function LoginPage(){
  const router = useRouter();
  const [user,setUser] = useState({username:"",email:"",password:""})
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);
  const notify = (msg:string) => toast(msg);

  const onLogin = async () => {
    try {
      setLoading(true);
      const resp =  await axios.post("/api/users/login",user);
      console.log(resp);
      toast.success("Login successful");
      router.push("/profile")
      
    } catch (error:any) {
      console.log(error.message)
      notify(error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false)
    else 
      setButtonDisabled(true)
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster/>
      <h1 className="text-center text-white text-2xl">Login</h1>
     
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

      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={onLogin}>
        Login
      </button>
      <Link href="/signup">Dont have an account ?</Link>
    </div>
  )
}