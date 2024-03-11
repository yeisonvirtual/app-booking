"use client"
import Image from 'next/image'

export const RoomCard = ({id, img, name, size, sleeps, description, price, setRoomSelected}) => {

  const onClick = () =>{
    setRoomSelected(id);
    console.log("onclick: ",id);
  }
  
  return (
    <div className="card w-full lg:w-[600px] bg-base-100 shadow-xl mx-[10px] my-[20px]">
      
      <figure>
        <Image
        src={img}
        priority={true}
        width={1024}
        height={1024}
        alt="card"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p><strong className='font-semibold'>Size:</strong> {size} m2</p>
        <p><strong className='font-semibold'>Sleeps:</strong> {sleeps} personas</p>
        <p>{description}</p>
        <h2 className="card-title">P/D: ${price}</h2>
        <div className="card-actions justify-end">
          <button onClick={onClick} className="btn btn-primary">Select</button>
        </div>
      </div>
    </div>
  )
}
