"use client"
import { useEffect, useState } from "react";
import { UpdateUserForm } from "@/components/UpdateUserForm"

const EditUser = ({params}) => {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    
    const getUserData = async () =>{
      const res = await fetch(`http://localhost:8080/api/users/${params.id}`,{
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