"use client"
import { useEffect, useState } from "react"
import { RoomCard } from "@/components/RoomCard"
import { BookingForm } from "@/components/BookingForm"

const BookingPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState("");

  const getRooms = async() => {

    try {
      const res = await fetch(`${process.env.API_URL}/api/rooms`,{
        credentials: 'include'
      });

      const data = await res.json();

      setRooms(data.rooms);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }

  useEffect(() => {
    getRooms();
    setIsLoading(true);
  }, []);

  return (
    <section className='min-h-[calc(100vh-56px)] pt-[80px] px-[10px]'>

      <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">
        
        <h3 className="text-gray-700 text-xl text-center font-bold pt-[20px] mb-[10px]">
          Booking
        </h3>

        <p className="text-gray-700  text-center font-bold pt-[20px] mb-[10px]">Reserve your room</p>

        <BookingForm rooms={rooms} roomSelected={roomSelected} />

        {
          isLoading && <h1>Loading...</h1>
        }
        
        <div className="flex flex-wrap justify-around">

          {
            rooms.map(room=>(
              <RoomCard
              key={room._id}
              id={room._id} img={room.image}
              name={room.name}
              size={room.size}
              sleeps={room.sleeps}
              description={room.description}
              price={room.price}
              setRoomSelected={setRoomSelected}
              />
            ))
          }

        </div>

      </div>
      
    </section>
  )
}

export default BookingPage