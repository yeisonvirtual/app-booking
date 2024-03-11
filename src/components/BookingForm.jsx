" use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const BookingForm = ({rooms, roomSelected}) => {

  const { 
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const router = useRouter();

  const [successForm, setSuccessForm] = useState(null);
  const [errorForm, setErrorForm] = useState(null);

  useEffect(() => {
    setValue("room",roomSelected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [roomSelected]);

  const checkAvailability = async() =>{

    const data = getValues();
    console.log(data.dateInit)
    console.log(data.dateEnd)

    if (!data.dateInit || !data.dateEnd) {
      setSuccessForm(null);
      setErrorForm({ message: 'Dates empty'});
      return false;
    }

    if (data.dateInit > data.dateEnd) {
      setSuccessForm(null);
      setErrorForm({ message: 'Dates error'});
      return false
    }

    try {
      const res = await fetch(`${process.env.API_URL}/api/bookings/check/${data.dateInit}/${data.dateEnd}`,{
        credentials: 'include'
      });

      const resJSON = await res.json();

      console.log(resJSON);

      if (res.status===200){ 
        setErrorForm(null);
        setSuccessForm({ message: 'Room availability'});
        return true;
      }
      else{ 
        setSuccessForm(null);
        setErrorForm({ message: 'No availability'});
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false
    }

  }

  const onSubmit = async(data) =>{

    router.push(`/booking/${data.room}?date-init=${data.dateInit}&date-end=${data.dateEnd}`);

  }

  return (

    <section className="flex flex-col">

      {successForm && <span className="text-green-500 text-xs italic text-center">{successForm.message}</span>}
      {errorForm && <span className="text-red-500 text-xs italic text-center">{errorForm.message}</span>}

      <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap justify-center items-center bg-white rounded px-[10px] py-[10px]"
      >

        <div className="w-full sm:w-[200px] mb-4 m-[10px]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room
          </label>
          <select
          className={`shadow border ${ errors.room ? 'border-red-500' : '' } w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          {...register("room", {
            required: true
          },
          )}
          >
            <option value=""></option>
            {
              rooms.map((room,index)=>(
                <option onClick={()=>setValue("room", room._id)} key={index} value={room._id}>{room.name}</option>
              ))
            }
          </select>
          {errors.room && <span className="text-red-500 text-xs italic">Select room</span>}
        </div>

        <div className="w-full sm:w-[200px] mb-4 m-[10px]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date init
          </label>
          <input
          className={`shadow appearance-none border ${ errors.dateInit ? 'border-red-500' : '' } w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="date"
          {...register("dateInit",{
            required: true
          })}
          />
          {errors.dateInit && <span className="text-red-500 text-xs italic">Date init field is required</span>}
        </div>

        <div className="w-full sm:w-[200px] mb-4 m-[10px]">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date end
          </label>
          <input
          className={`shadow appearance-none border ${ errors.dateEnd ? 'border-red-500' : '' } w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="date"
          {...register("dateEnd",{
            required: true
          })}
          />
          {errors.dateEnd && <span className="text-red-500 text-xs italic">Date end field is required</span>}
        </div>

        <div className="w-full sm:w-auto mt-[20px] flex flex-col sm:flex-row items-center justify-center">
          
          <button
          className="w-full sm:w-auto m-[10px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={checkAvailability}
          type="button"
          >
            Check availability
          </button>

          {
            successForm && (
              <button
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              >
                Reserve
              </button>
            )
          }
          
        </div>

      </form>

    </section>

  )
}
