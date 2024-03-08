import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request) {

  const token = request.cookies.get('token');

  // console.log(request.nextUrl.pathname);
  // console.log(token);

  // if(request.nextUrl.pathname.startsWith('/dashboard'))

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  const secret = new TextEncoder().encode(process.env.SECRET);
  
  try {

    const { payload } = await jwtVerify(token.value, secret);
    // elimina el id e iat
    // const { id, iat, ...user } = payload;
    // console.log(user);

    if(request.nextUrl.pathname.startsWith('/admin') && payload.type!=="admin") return NextResponse.redirect(new URL('/dashboard', request.url));
      
    return NextResponse.next();

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

}

// Rutas que pasan por el middleware
export const config = {
  matcher: ['/dashboard', '/admin/:path*'],
}