"use client"

import { useEffect, useState } from "react"

const HomePage = () => {

  const [message, setMessage] = useState('Loading');
  const [people, setPeople] = useState([]);

  const getHome = async ()=>{
    const res = await fetch("http://localhost:8080/api/home");
    const data = await res.json();
    console.log(data);
    setMessage(data.message);
    setPeople(data.people);
    return res;
  }

  useEffect(()=>{
    getHome();
  },[]);

  useEffect(()=>{
    console.log(message);
  },[message]);

  return (
    <div>
      <h1>{message}</h1>
      <ul>
      {
        people.map((item, index)=>(
          <li key={index}>{item}</li>
        ))
      }
      </ul>
    </div>
  )
}

export default HomePage