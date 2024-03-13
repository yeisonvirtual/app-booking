import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request) {

  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if(
    request.nextUrl.pathname==='/' ||
    request.nextUrl.pathname.startsWith('/dashboard')
  ) return NextResponse.redirect(new URL('/booking', request.url));
  
  const secret = new TextEncoder().encode(process.env.SECRET);
  
  try {

    const { payload } = await jwtVerify(token.value, secret);

    console.log(payload)
    
    if(request.nextUrl.pathname.startsWith('/admin') && payload.type!=="admin") return NextResponse.redirect(new URL('/dashboard', request.url));
    
    return NextResponse.next();

  } catch (error) {
    console.log("Error middleware: ",error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

}

// Rutas que pasan por el middleware
export const config = {
  matcher: ['/', '/dashboard', '/booking', '/admin/:path*'],
}