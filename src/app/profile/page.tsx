"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ProfilePage(){
  const router = useRouter();
  const notify = (msg:string) => toast(msg);
  const [data,setData] = useState("");
  const logout = () =>{
    try {
      axios.get('/api/users/logout')
      notify("Logout successful")
      router.push("/login");
      
    } catch (error:any) {
      console.log("Failed to logout "+ error)
      notify("Failed to logout " + error.message)
    }
  }

  const getUserDetails = async () =>{
    const res =  await axios.get('/api/users/me')
    console.log(res.data.data)
    setData(res.data.data._id)
  }
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p> 
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : "No information avilable"}
      </p>
      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={logout} >Logout</button>
      <button className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg" onClick={getUserDetails} >Get Details</button>
    </div>
  )
}