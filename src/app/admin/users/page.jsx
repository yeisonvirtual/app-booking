"use client"

import { useEffect, useState } from "react"
import Garbage from "@/assets/images/garbage.png"
import Pencil from "@/assets/images/pencil.png"
import Image from "next/image"
import { useRouter } from "next/navigation"

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  const getTotalPages = (value) => {
    let pages = [];
    
    for (let i = 1; i <= value; i++) {
      pages.push(<button key={i} onClick={()=> checked(i)} className={`join-item btn ${page==(i) ? "btn-active" : ""}`}>{i}</button>);
    }
    
    return pages;
  };

  const checked = (value) => {
    setPage(value);
  }

  const getUsers = async() => {
    // http://localhost:8080/api/users?limit=5&page=1
    const res = await fetch(`http://localhost:8080/api/users?limit=5&page=${page}`,{
      credentials: 'include'
    });

    const data = await res.json();
    console.log(data.users);
    setUsers(data.users.docs);
    setTotalPages(data.users.totalPages);
  }

  const editUser = (id) => {
    router.push(`users/edit/${id}`);
  }

  const deleteUser = async (id) => {
    // http://localhost:8080/api/users?limit=5&page=1
    const res = await fetch(`http://localhost:8080/api/users/delete/${id}`,{
      method: 'POST',
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
    console.log(users);
  }, [page]);

  return (

    
    <section className="h-[calc(100vh-56px)] pt-[80px] px-[20px]">

      <h3 className="text-gray-700 text-xl text-center font-bold pt-[20px] mb-[10px]">Users</h3>

      {
        users.length>0 && (

          <>
            <div className="overflow-x-auto h-96">
              <table className="table table-xs sm:table-md">
                <thead>
                  <tr>
                    <th></th> 
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
                    users.map((user,index)=>(
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
                  {getTotalPages(totalPages)}
                </div>
              )
            }
          
          </>

        )
      }
      
    </section>
  )
}

export default UsersPage