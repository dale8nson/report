import { NextRequest, NextResponse } from 'next/server';



export default async function middleware(request: NextRequest) {
  // console.log(`request:`, request);
  const url = new URL(request.url);
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  const authRequest = new NextRequest(new URL('https://report-ten-orcin.vercel.app/api/auth', import.meta.url));

  // console.log()
  // console.log(`url:`, url);
  authRequest.headers.set('code', code as string);
  const authResponse = await fetch(authRequest);
  const json = await authResponse.json();
  console.log(`authResponse:`, json);

  // const db = client.db('report');
  // const password = db.collection('password');

  // url.pathname = '/';
  // console.log(`return fetch(url);`);
  if (json.valid === true) {
    return fetch(url);
  }
  return NextResponse.redirect(new URL('/invalid-code', request.url));
}

export const config = {
  matcher:'/:path'
}

