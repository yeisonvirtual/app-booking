import { NextResponse } from 'next/server';

export async function POST(request) {

  try {

    const data = await request.json();

  console.log("DATA: ",data)

  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('size', data.size);
  formData.append('price', data.price);
  formData.append('description', data.description);
  formData.append('image', data.image.name);

  console.log("formData: ",formData)

  const res = await fetch("http://localhost:8080/api/rooms/add",{
    method: 'POST',
    credentials: "include",
    body: formData
  });
  
  const resJSON = await res.json();
  console.log(resJSON)

  return NextResponse.json(formData,
  {
    status: 500
  }
  );
    
  } catch (error) {
    console.log(error)
  }

  
  
}