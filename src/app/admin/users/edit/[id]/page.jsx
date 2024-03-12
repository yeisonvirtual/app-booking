"use client"
import { useEffect, useState } from "react";
import { UpdateUserForm } from "@/components/UpdateUserForm";

import { getCookie } from 'cookies-next';

const EditUser = ({params}) => {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    
    const getUserData = async () =>{
      const res = await fetch(`${process.env.API_URL}/api/users/${params.id}`,{
        headers: {
          "Token": `${getCookie("token")}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data.user.email);
      setUserData(data.user);
    }

    getUserData();

  }, []);

  return (
    <section className="h-[calc(100vh-56px)] pt-[80px] px-[20px]">

      <div className="flex justify-center mt-[20px]">
        <UpdateUserForm userData={userData} />
      </div>
      
    </section>
  )
}

export default EditUser