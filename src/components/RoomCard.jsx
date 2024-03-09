"use client"
import Image from 'next/image'

export const RoomCard = ({id, img, name, size, sleeps, description, price}) => {
  return (
    <div key={id} className="card w-full lg:w-[600px] bg-base-100 shadow-xl mx-[10px] my-[20px]">
      <figure><Image src={img} priority={true} placeholder="blur" alt="car!" /></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p><strong className='font-semibold'>Size:</strong> {size}m2</p>
        <p><strong className='font-semibold'>Sleeps:</strong> {sleeps} personas</p>
        <p>{description}</p>
        <h2 className="card-title">P/D: ${price}</h2>
        <div className="card-actions justify-end">
          <button onClick={()=> console.log(id)} className="btn btn-primary">Reservar</button>
        </div>
      </div>
    </div>
  )
}
