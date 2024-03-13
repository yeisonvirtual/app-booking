"use client"
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from 'next/navigation'
import Image from "next/image"
import { UserContext } from "@/context/UserContext";

import { getCookie } from 'cookies-next';

const BookingRoom = ({params}) => {

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();

  const { user } = useContext(UserContext);

  const searchParams = useSearchParams(); 

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState([]);

  const [success, setSuccess] = useState(false);
  const [errorBooking, setErrorBooking] = useState(false);

  const calcTotalPrice = ()=>{
    return room.price * totalDays;
  }

  const recorrerDates = (fecha1, fecha2)=>{
    // year month day
    const f1 = new Date(fecha1[0], (fecha1[1]-1), fecha1[2]);
    const f2 = new Date(fecha2[0], (fecha2[1]-1), fecha2[2]);

    const dates = [];

    for (let fActual = f1; fActual <= f2; fActual.setDate(fActual.getDate() + 1)) {
      dates.push(fActual.toLocaleDateString());
    }

    return dates;
  }

  // paramsURL
  const di = searchParams.get('date-init');
  const de = searchParams.get('date-end');

  // array dates
  const fecha1 = di.split("-");
  const fecha2 = de.split("-");
  const dates = recorrerDates(fecha1, fecha2);

  // dias totales === cantidad de dates
  const totalDays = dates.length;
  // price * totalDays
  const totalPrice = calcTotalPrice();

  const getRoom = async() => {

    try {
      const res = await fetch(`${process.env.API_URL}/api/rooms/${params.id}`,{
        headers: {
          "Token": `${getCookie("token")}`
        },
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data.room);
      setRoom(data.room);
      console.log("room: ",room)
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const onSubmit = async(data) =>{

    data.roomID = room._id;
    data.userID = user.id;
    data.dateInit = di;
    data.dateEnd = de;
    data.totalPrice = totalPrice;
    data.dates = dates;

    try {

      setIsLoading(true);

      const res = await fetch(`${process.env.API_URL}/api/invoices/create`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Token": `${getCookie("token")}`
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const resJSON = await res.json();

      if (res.status===201) {
        setSuccess(resJSON);
        setIsLoading(false);
        console.log(resJSON);
      } else {
        console.log(resJSON);
        setErrorBooking(resJSON);
        setIsLoading(false);
      }
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getRoom()
  }, [])
  
  return (
    <section className='min-h-[calc(100vh-56px)] pt-[80px] px-[10px]'>

      <div className="flex justify-center">

        <div className="max-w-[600px] bg-white shadow-md rounded-badge mt-[20px] p-[20px] sm:p-[20px]">
          
          <h3 className="text-gray-700 text-xl text-center font-bold pt-[20px] mb-[10px]">
            Booking
          </h3>
          
          {
            !isLoading && room && (
              <div className="mb-[10px]">
                <img className="w-full" src={room.image} alt="img-room" />
              </div>
            )
          }

          <div>
            <div className="flex">
              <p><strong>Room:</strong> {room.name}</p>
            </div>
            <div className="flex">
              <p><strong>Date init:</strong> {`${fecha1[2]}/${fecha1[1]}/${fecha1[0]}`}</p>
            </div>
            <div className="flex">
              <p><strong>Date end:</strong> {`${fecha2[2]}/${fecha2[1]}/${fecha2[0]}`}</p>
            </div>
            <div className="flex">
              <p><strong>Total Days:</strong> {totalDays}</p>
            </div>
            <div className="flex">
              <p><strong>Total price:</strong> {totalPrice}</p>
            </div>
            

            <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-white rounded py-[10px]"
            >
            
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reference
                </label>
                
                <input
                className={`text-slate-900 dark:text-white shadow appearance-none border ${ errors.reference ? 'border-red-500' : '' } w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                disabled={success}
                placeholder="Reference"
                {...register("reference", {
                  required: {
                    value: true,
                    message: 'Reference is required'
                  }
                })}
                />
                {errors.reference && <span className="text-red-500 text-xs italic">Reference field is required</span>}
              </div>

              {
                success && (
                  <>
                    <h3 className="text-gray-700 text-xl text-center font-bold pt-[20px] mb-[10px]">
                      Booking successfully
                    </h3>

                    <p><strong>Invoice reference:</strong> {success.id}</p>
                    
                    <div className="w-full mt-[20px] flex items-center justify-between">
                      <button
                      className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={()=> router.push("/booking")}
                      >
                        Booking
                      </button>
                    </div>
                  </>
                )
              }
              
              {
                !success && (
                  <div className="w-full mt-[20px] flex items-center justify-between">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                      Reserve
                    </button>
                  </div>
                )

              }

            </form>
          
          </div>

        </div>

      </div>
      
    </section>
  )

}

export default BookingRoom;
