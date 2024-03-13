"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";

import { getCookie } from 'cookies-next';

export const RoomForm = ({getRooms}) => {

  const { 
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  
  const [file, setFile] = useState(null);
  const [pathImage, setPathImage] = useState("");

  const onFileChange = (e) => {
    
    if(e.target.files && e.target.files.length > 0){
      const fl = e.target.files[0];
      if(fl.type.includes("image")){
        const reader = new FileReader();
        reader.readAsDataURL(fl);
        reader.onload = function load() {
          setPathImage(reader.result);
        }
        setFile(fl);

      } else {
        console.log("error");
      }
    }
  }

  const onSubmit = async (data, event) =>{
    
    event.preventDefault();
    
    data.image = file;

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('size', data.size);
    formData.append('sleeps', data.sleeps);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('image', data.image);

    const res = await fetch(`${process.env.API_URL}/api/rooms/add`,{
      method: 'POST',
      headers: {
        "Token": `${getCookie("token")}`
      },
      credentials: "include",
      body: formData
    });

    //console.log(res);
    const resJSON = await res.json();
    //console.log(resJSON);

    if (res.status===201) {
      console.log('Added successfully');
      setSuccess(true);
      getRooms();
      console.log(resJSON);
    } else {
      console.log('Added error');
      setErrorForm(resJSON)
    }

  }

  const clearForm = () =>{

    setValue("name","");
    setValue("size","");
    setValue("sleeps","");
    setValue("price","");
    setValue("description","");
    setValue("image","");
    setPathImage("");
    setFile("");

    setSuccess(false);

  }

  return (

    <section className="flex flex-col items-center justify-center">

      <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white dark:bg-slate-800 rounded px-[10px] py-[10px]">
        
        <h3 className="text-slate-900 dark:text-white text-xl text-center font-bold mb-[10px]">Add room</h3>
        
        {errorForm && <span className="text-red-500 text-xs italic">{errorForm.message}</span>}

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            Name
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow border ${ errors.name ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Name"
          {...register("name", {
            required: {
              value: true,
              message: 'Name is required'
            }
          })}
          />
          {errors.name && <span className="text-red-500 text-xs italic">Name field is required</span>}
        </div>

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            Size
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow border ${ errors.size ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="number"
          placeholder="Size"
          {...register("size", {
            required: {
              value: true,
              message: 'Size is required'
            },
            validate: "size"
          })}
          />
          {errors.size && <span className="text-red-500 text-xs italic">Size field is required</span>}
        </div>

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            Sleeps
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow border ${ errors.sleeps ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="number"
          placeholder="Sleeps"
          {...register("sleeps", {
            required: {
              value: true,
              message: 'Sleeps is required'
            }
          })}
          />
          {errors.sleeps && <span className="text-red-500 text-xs italic">Sleeps field is required</span>}
        </div>

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            P/D
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow border ${ errors.price ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="number"
          placeholder="Price"
          {...register("price", {
            required: {
              value: true,
              message: 'Price is required'
            }
          })}
          />
          {errors.price && <span className="text-red-500 text-xs italic">Price field is required</span>}
        </div>

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            Description
          </label>
          <textarea
          rows="10"
          className={`text-slate-900 dark:text-white shadow border ${ errors.description ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          placeholder="Description"
          {...register("description", {
            required: {
              value: true,
              message: 'Description is required'
            }
          })}
          />
          {errors.description && <span className="text-red-500 text-xs italic">Description field is required</span>}
        </div>

        <div className="mb-4">
          <label className="text-slate-900 dark:text-white block text-sm font-bold mb-2">
            Image
          </label>
          <input
          className={`shadow appearance-none border ${ errors.image ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={onFileChange}
          
          />
          {errors.image && <span className="text-red-500 text-xs italic">Image field is required</span>}

          <img
          className="py-[20px]"
          src={pathImage}
          alt="img"
          />

        </div>

        <div className="flex items-center justify-between">
          
          <div>

            <button
            disabled={success}
            className={`${ success ? "bg-gray-600" : "bg-blue-500" } hover:bg-blue-700 text-white font-bold py-2 px-4 mr-[10px] rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            >
              Add
            </button>

            {
              success && (
                <button
                onClick={clearForm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Clear
                </button>
              )
            }

          </div>

          { success && <span className="text-green-500 text-xs italic">Added successfully</span> }
          
        </div>
      </form>
      
    </section>

  )
}
