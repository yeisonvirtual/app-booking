"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateForm = ({userData}) => {

  const { 
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = async(data) =>{
    const res = await fetch(`http://localhost:8080/api/users/update/${userData._id}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const resJSON = await res.json();

    console.log(res);

    if (res.status===200) {
      setSuccess('Updated successfully');
      console.log(resJSON);
      //router.push('/admin/users');
    } else {
      console.log('Update error');
      setErrorForm(resJSON)
    }
  }

  useEffect(()=>{
    setValue("name", userData.name);
    setValue("email", userData.email);
    setValue("type", userData.type);
    if (userData.active) setValue("active", "1");
    else setValue("active", "0");
  },[userData]);

  const _onSubmit = (data)=>{
    data.active = data.active === "1";
    console.log(data)
    onSubmit(data);
  }

  const [errorForm, setErrorForm] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <form onSubmit={handleSubmit(_onSubmit)} className="w-full min-w-[280px] sm:w-[400px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4l">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Update</h3>
        
        {success && <span className="text-green-500 text-xs italic">{success}</span>}
        {errorForm && <span className="text-red-500 text-xs italic">{errorForm.message}</span>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
          className={`shadow appearance-none border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Name"
          {...register("name",{
            required: true
          })}
          />
          {errors.name && <span className="text-red-500 text-xs italic">Name field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
          className={`shadow appearance-none border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="email"
          placeholder="Email"
          
          {...register("email", {
            required: true,
            validate: "email"
          })}
          />
          {errors.email && <span className="text-red-500 text-xs italic">Email field is required</span>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
          className={`shadow border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          {...register("type")}
          >
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Active
          </label>
          <select
          className={`shadow border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          {...register("active")}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div> 

        <div className="flex items-center justify-between">
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
            Update
          </button>
        </div>
      </form>
  )
}
