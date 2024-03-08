"use client";
import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div className="flex justify-between items-center h-[80px] px-[20px] bg-orange-600">
      <h1>NavBar</h1>
      <nav>
        <button onClick={toggle} className={`${isOpen? 'hidden' : ''} sm:hidden border rounded-md p-[10px] bg-blue-600`}>open</button>
        <ul className={`${isOpen? '' : 'hidden'} fixed top-0 right-0 h-full w-[150px] pt-[10px] sm:pt-0 sm:flex sm:w-[120px] sm:h-[25px] sm:relative bg-orange-600`}>
          <button onClick={toggle} className={`${isOpen? '' : 'hidden'} sm:hidden border rounded-md p-[10px] ml-[80px] mb-[20px] bg-blue-600`}>close</button>
          <li className="text-center mb-[20px] sm:h-full sm:mr-[20px]">
            <Link href="/">Home</Link>
          </li>
          <li className="text-center mb-[20px] sm:mr-[20px]">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
