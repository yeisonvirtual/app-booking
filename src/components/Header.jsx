// "use client"
import Link from "next/link"
import { NavBar } from "../components/NavBar"

export const Header = () => {

  return (
    <div className="navbar bg-neutral h-[80px] fixed z-10 text-neutral-content">
      <div className="flex-1">
        <Link href="/booking" className="btn btn-ghost text-xl">
          Booking App
        </Link>
      </div>
      <NavBar />
    </div>
  )
}
