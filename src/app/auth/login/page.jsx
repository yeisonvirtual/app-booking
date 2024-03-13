"use client"
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from 'cookies-next';

const LoginPage = () => {

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { setUser, setIsAuthenticated } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorForm, setErrorForm] = useState(null);

  const router = useRouter();

  const onSubmit = async (data) =>{

    try {

      setIsLoading(true);

      const res = await fetch(`${process.env.API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      //console.log("res: ",res);
  
      const resJSON = await res.json();
  
      console.log("resJSON: ",resJSON);
  
      if (res.status===201) {
  
        setCookie('token', resJSON.token,{
          maxAge: 1000 * 60 * 60 * 24 * 30
        });

        setUser(resJSON.user);
        setIsAuthenticated(true);
  
        router.push('/booking');
  
      } else {
        console.log('Login error');
        setErrorForm(resJSON)
        setIsAuthenticated(false);
      }

      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }

  return (

    <section className="flex flex-col h-[calc(100vh-56px)] items-center justify-center">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full min-w-[280px] sm:w-[400px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4l">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Login</h3>
        
        {errorForm && <span className="text-red-500 text-xs italic">{errorForm.message}</span>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow appearance-none border ${ errors.email ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Password
          </label>
          <input
          className={`text-slate-900 dark:text-white shadow appearance-none border ${ errors.password ? 'border-red-500' : '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
            {
              isLoading
              ? <span className="loading loading-spinner"></span>
              : <p>Login</p>
            }
          </button>
          <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/register">
            Register
          </Link>
        </div>
      </form>

    </section>

  )
}

export default LoginPage