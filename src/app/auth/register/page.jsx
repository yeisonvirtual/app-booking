"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [errorForm, setErrorForm] = useState(null);

  const router = useRouter();

  const onSubmit = async (data) =>{

    const res = await fetch("http://localhost:8080/api/auth/register",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const resJSON = await res.json();

    console.log(res);

    if (res.status===201) {
      console.log('Register successfully');
      console.log(resJSON);
      router.push('/auth/login');
    } else {
      console.log('Register error');
      setErrorForm(resJSON)
    }
  }

  return (

    <section className="flex flex-col h-[calc(100vh-56px)] pt-[80px] items-center justify-center bg-gray-200">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full min-w-[280px] sm:w-[400px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4l">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Register</h3>
        
        {errorForm && <span className="text-red-500 text-xs italic">{errorForm.message}</span>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
          className={`shadow appearance-none border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
          className={`shadow appearance-none border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: 'Email is required'
            },
            validate: "email"
          })}
          />
          {errors.email && <span className="text-red-500 text-xs italic">Email field is required</span>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
          className={`shadow appearance-none border ${ errors.password ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="password"
          placeholder="******************"
          {...register("password", {
            required: {
              value: true,
              message: 'Password is required'
            }
          })}
          />
          {errors.password && <span className="text-red-500 text-xs italic">Password field is required</span>}
        </div>

        <div className="flex items-center justify-between">
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
            Register
          </button>
          <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/login">
            Login
          </Link>
        </div>
      </form>

    </section>
  )
}

export default RegisterPage