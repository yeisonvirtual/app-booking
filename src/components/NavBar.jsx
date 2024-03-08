"use client"
import { useContext, useState } from "react";
import { deleteCookie } from 'cookies-next';
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Link from "next/link"
import Image from 'next/image'
import ImgUser from "../assets/images/user-default.png"

export const NavBar = () => {

  const { user, setUser, isLoading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();
  
  const router = useRouter();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logout = () =>{
    deleteCookie("token");
    setUser(null);
    router.push("/auth/login");
  }

  return (
    <div className="flex-none z-10">
      <button onClick={toggle} className={`sm:hidden z-10 btn btn-square btn-ghost`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <ul 
      className={`
      menu sm:menu-horizontal px-1 bg-neutral
      ${isOpen? '' : 'hidden'}
      fixed top-0 right-0 pt-[80px]
      h-full w-[200px] items-center
      sm:static sm:w-auto sm:pt-0 sm:flex sm:items-center
      `}>

        {
          !isLoading && !user && (
            <>
              <li className={`${path === "/" ? "opacity-50" : ""} mb-[10px] sm:m-0`}>
                <Link href='/'>Home</Link>
              </li>
              <li className={`${path === "/auth/login" ? "opacity-50" : ""} mb-[10px] sm:m-0`}>
                <Link href='/auth/login'>Login</Link>
              </li>
              <li className={`${path === "/auth/register" ? "opacity-50" : ""} mb-[10px] sm:m-0`}>
                <Link href='/auth/register'>Register</Link>
              </li>
            </>
          )
        }

        {
          !isLoading && user && (
            <li className={`${path === "/dashboard" ? "opacity-50" : ""} mb-[10px] sm:m-0`}>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
          )
        }

        {
          !isLoading && user && user.type==="admin" && (
            <li className="mb-[10px] sm:m-0">
              <details>
                <summary className={`${path.startsWith("/admin") ? "opacity-50" : ""}`}>
                  Admin
                </summary>
                <ul className={`p-2 bg-neutral rounded-t-none`}>
                  <li className={`${path === "/admin/users" ? "opacity-50" : ""}`}>
                    <Link href="/admin/users">Users</Link>
                  </li>
                  <li className={`${path === "/admin/rooms" ? "opacity-50" : ""}`}>
                    <Link href="/admin/rooms">Rooms</Link>
                  </li>
                </ul>
              </details>
            </li>
          )
        }

        <li className={`${path === "/about" ? "opacity-50" : ""} mb-[10px] sm:m-0`}>
          <Link href='/about'>About</Link>
        </li>

        {
          !isLoading && user && (

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-[40px] rounded-full">
                  {/* https://picsum.photos/200/300 */}
                  <Image
                  src={ImgUser}
                  width={500}
                  height={500}
                  alt="user-img"
                  placeholder="blur"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                <li>
                  <p className="justify-between">
                    {user.name}
                    <span className="badge">User</span>
                  </p>
                </li>
                <li><Link onClick={logout} href="/auth/login">Logout</Link></li>
              </ul>
            </div>
          )
        }

      </ul>
    </div>
  )
}
