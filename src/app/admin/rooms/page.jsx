"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { RoomForm } from "@/components/RoomForm"
import Garbage from "@/assets/images/garbage.png"
import Pencil from "@/assets/images/pencil.png"

const RoomPage = () => {

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

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

  const getRooms = async() => {

    try {
      const res = await fetch(`http://localhost:8080/api/rooms?limit=5&page=${page}`,{
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data.rooms);
      setRooms(data.rooms.docs);
      setTotalPages(data.rooms.totalPages);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }

  const editRoom = (id)=>{
    console.log("edit room: ",id);
  }

  const deleteRoom = (id)=>{
    console.log("delete room: ",id);
  }

  useEffect(() => {
    getRooms();
    setIsLoading(true);
    console.log(rooms);
  }, [page]);


  return (

    <section className='min-h-[calc(100vh-56px)] pt-[80px] px-[20px]'>

      <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Rooms</h3>

        <div className="w-full flex justify-end pr-[5px] sm:pr-[20px] pb-[20px]">
          <button className="btn btn-neutral" onClick={()=>document.getElementById('my_modal_5').showModal()}>
            Add user
          </button>
        </div>
        
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle mt-[5px]">
          <div className="modal-box">

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            {/* <h3 className="font-bold text-lg">Add Room</h3>
            <p className="py-4">Press ESC key or click the button below to close</p> */}
            <RoomForm />

          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>

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
                rooms.map(room=>(
                  <tr key={room._id} className="hover">
                    <th>{room._id}</th> 
                    <td>{room.name}</td> 
                    <td>{room.size}</td>
                    <td>{room.price}</td>
                    <td>{room.sleeps}</td> 
                    <td className="min-w-[200px]">
                      {room.description}
                    </td> 
                    <td>
                      <button onClick={()=> editRoom(room._id)} className="btn btn-sm btn-info"> <Image src={Pencil} width={15} alt="E" /> </button>
                      <button onClick={()=> deleteRoom(room._id)} className="btn btn-sm btn-error"> <Image src={Garbage} width={15} alt="D"/> </button>
                    </td>
                  </tr>
                ))
              }

            </tbody> 
                
          </table>
        </div>

        <div className="join pt-[10px]">
          {getPagination(4)}
        </div>

      </div>
      
    </section>
  )
}

export default RoomPage