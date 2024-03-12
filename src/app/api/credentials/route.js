import { NextResponse } from "next/server";
import { serialize } from "v8";

export async function POST(request) {
  
  const { token } = await request.json();

  console.log(token)

  if(!token) return NextResponse.json({ message: 'Token no found'}, {status: 400});

  // const serialized = serialize('token', token,{
	// 	httpOnly: true,
  //   sameSite: 'strict',
  //   maxAge: 1000 * 60 * 60 * 24 * 30,
  //   path: '/'
  // });

  // response.setHeader('Set-Cookie',serialized);

  //const response = NextResponse.next();
  
  // response.cookies.set({
	// 	name: 'token',
	// 	value: token,
	// 	httpOnly: true,
  //   sameSite: 'strict',
  //   maxAge: 1000 * 60 * 60 * 24 * 30,
  //   path: '/'
	// });
    
  return NextResponse.json({ message: 'Login successfully' }, {status: 201 , headers: {
    'Set-Cookie': `token=${token}; path=/; Max-Age=2592000; Secure`
  }});

}

export async function GET() {
  return NextResponse.json('correcto');
}