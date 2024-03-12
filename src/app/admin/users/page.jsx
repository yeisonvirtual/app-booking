"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Garbage from "@/assets/images/garbage.png"
import Pencil from "@/assets/images/pencil.png"

import { getCookie } from 'cookies-next';

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  const checked = (value) => {
    setPage(value);
  }

  const getPagination = (value) => {
    let pages = [];
    
    for (let i = 1; i <= value; i++) {
      pages.push(<button key={i} onClick={()=> checked(i)} className={`join-item btn ${page==(i) ? "btn-active" : ""}`}>{i}</button>);
    }
    
    return pages;
  };

  const getUsers = async() => {

    try {

      const res = await fetch(`${process.env.API_URL}/api/users?limit=5&page=${page}`,{
        headers: {
          "Token": `${getCookie("token")}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      //console.log(data.users);
      setUsers(data.users.docs);
      console.log(data.users.docs);
      setTotalPages(data.users.totalPages);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }

  const editUser = (id) => {
    router.push(`users/edit/${id}`);
  }

  const deleteUser = async (id) => {
    const res = await fetch(`${process.env.API_URL}/api/users/delete/${id}`,{
      method: 'POST',
      headers: {
        "Token": `${getCookie("token")}`
      },
      credentials: 'include'
    });
    
    console.log(res);
    const data = await res.json();
    console.log(data);
    
    setPage(1);
    getUsers();
    console.log("delete successfully");
  }

  useEffect(() => {
    getUsers();
    setIsLoading(true);
  }, [page]);

  return (

    <section className="min-h-[calc(100vh-56px)] pt-[80px] px-[20px]">

    <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">

      <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Users</h3>

      {
        isLoading && (<h1>Loading...</h1>)
      }

      {
        !isLoading && users.length===0 && (<h1>Not users found</h1>)
      }

      {
        users.length>0 && (

          <>
            <div className="overflow-x-auto h-[330px]">
              <table className="table table-xs sm:table-md text-center">
                <thead>
                  <tr>
                    <th>ID</th> 
                    <th>Name</th> 
                    <th>Email</th> 
                    <th>Type</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Options</th>
                  </tr>
                </thead> 
                <tbody>

                  {
                    users.map((user)=>(
                      <tr key={user._id} className="hover">
                        <th>{user._id}</th> 
                        <td>{user.name}</td> 
                        <td>{user.email}</td> 
                        <td>{user.type}</td> 
                        <td>{ user.active ? "🟢" : "🔴" }</td> 
                        <td>{new Date(user.createdAt).getDate() +"/"+ new Date(user.createdAt).getMonth() +"/"+ new Date(user.createdAt).getUTCFullYear()}</td> 
                        <td>
                          <button onClick={()=> editUser(user._id)} className="btn btn-sm btn-info"> <Image src={Pencil} width={15} alt="E" /> </button>
                          <button onClick={()=> deleteUser(user._id)} className="btn btn-sm btn-error"> <Image src={Garbage} width={15} alt="D"/> </button>
                        </td>
                      </tr>
                    ))
                  }
                  
                </tbody> 
                
              </table>
              
            </div>
            
            {
              totalPages>1 && (
                <div className="join pt-[10px]">
                  {getPagination(totalPages)}
                </div>
              )
            }
          
          </>

        )
      }
      </div>
      
    </section>
  )
}

export default UsersPage