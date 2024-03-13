"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { RoomForm } from "@/components/RoomForm"
import Garbage from "@/assets/images/garbage.png"

import { getCookie } from 'cookies-next';

const RoomPage = () => {

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const getRooms = async() => {

    try {

      const res = await fetch(`${process.env.API_URL}/api/rooms`,{
        headers: {
          "Token": `${getCookie("token")}`
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data.rooms);
      setRooms(data.rooms);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }

  const deleteRoom = async(id)=>{

    try {

      const res = await fetch(`${process.env.API_URL}/api/rooms/delete/${id}`,{
        method: 'POST',
        headers: {
          "Token": `${getCookie("token")}`
        },
        credentials: 'include'
      });

      console.log(res)

      const data = await res.json();
      console.log(data);

      if (res.status===200) {
        console.log("Deleted successfully");
        getRooms();
        console.log(data);
      } else {
        console.log("Deleted error");
        console.log(data);
      }

    } catch (error) {
      console.log(error);
    }
    console.log("delete room: ",id);
  }

  useEffect(() => {
    getRooms();
    setIsLoading(true);
    console.log(rooms);
  }, []);

  return (

    <section className='min-h-[calc(100vh-56px)] pt-[80px] px-[20px]'>

      <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Rooms</h3>

        <div className="w-full flex justify-end pr-[5px] sm:pr-[20px] pb-[20px]">
          <button className="btn btn-neutral" onClick={()=>document.getElementById('my_modal_5').showModal()}>
            Add room
          </button>
        </div>
        
        <dialog id="my_modal_5" className="bg-white modal modal-bottom sm:modal-middle mt-[5px]">
          <div className="modal-box">

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

            <RoomForm getRooms={getRooms} setRooms={setRooms} />
            
            <form className="flex justify-end" method="dialog">
              <button className="btn btn-neutral">Close</button>
            </form>

          </div>

          

        </dialog>

        <div className="overflow-x-auto h-[330px]">
          <table className="table table-xs sm:table-md text-center">
            <thead>
              <tr>
                <th>ID</th> 
                <th>Name</th> 
                <th>Size (m2)</th> 
                <th>P/D ($)</th>
                <th>Sleeps</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead> 
            <tbody>

              {
                !isLoading && rooms.map(room=>(
                  <tr key={room._id} className="hover">
                    <th className="">{room._id}</th> 
                    <td>{room.name}</td> 
                    <td>{room.size}</td>
                    <td>{room.price}</td>
                    <td>{room.sleeps}</td> 
                    <td className="min-w-[200px]">
                      {room.description}
                    </td> 
                    <td>
                      <button onClick={()=> deleteRoom(room._id)} className="btn btn-sm btn-error"> <Image src={Garbage} width={15} alt="D"/> </button>
                    </td>
                  </tr>
                ))
              }

            </tbody> 
                
          </table>
        </div>

      </div>
      
    </section>
  )
}

export default RoomPage