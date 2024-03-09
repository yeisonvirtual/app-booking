"use client"
import ImgRoom1 from "@/assets/images/room-1.jpeg"
import Image from "next/image"
import { useState } from "react"
import { RoomCard } from "@/components/RoomCard"

const BookingPage = () => {

  const [page, setPage] = useState(1);

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

  return (
    <section className='pt-[80px] px-[10px]'>

      <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">
        
        <h3 className="text-gray-700 text-xl text-center font-bold pt-[20px] mb-[10px]">Booking</h3>

        <p className="text-gray-700  text-center font-bold pt-[20px] mb-[10px]">Reserve your room</p>
        
        <div className="flex flex-wrap justify-around">

          <RoomCard
          id={1} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

          <RoomCard
          id={2} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

        <RoomCard
          id={3} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

        <RoomCard
          id={4} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

        <RoomCard
          id={5} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

        <RoomCard
          id={6} img={ImgRoom1}
          name={"Palms Casino Resort"}
          size={"200"}
          sleeps={"4"}
          description={"Dispone de un casino, además de un spa y un increíble auditorio donde tocan músicos de la talla de Billy Idol."}
          price={20}
          />

          <div className="join pt-[10px]">
            {getPagination(4)}
          </div>

        </div>

      </div>
      
    </section>
  )
}

export default BookingPage