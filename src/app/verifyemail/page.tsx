"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage(){
  const [token,setToken] = useState("");
  const [verified,setVerified] = useState(false);
  const [error,setError] = useState(false)


  const verifyEmail = async () => {
    try {
      axios.post('/api/users/verify',{token})
      setVerified(true);
    } catch (error:any) {
      setError(true);
      console.log(error.message)
    }
  }

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setToken(urltoken || "");
  },[]);

  useEffect(()=>{
    if(token.length > 0 ){ verifyEmail(); }else { }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">
        Verify Email
      </h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      
      {
        verified && (
          <div>
            <p className="text-2xl bg-green-500">Email Verified</p>
            <Link href="/login">Login</Link>
          </div>
        )
      }

{
        error && (
          <div>
            <p className="text-2xl bg-red-500">Verification failed</p>
            {/* <Link href="/login">Login</Link> */}
          </div>
        )
      }
    </div>
  )

}