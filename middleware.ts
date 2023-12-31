import { NextRequest, NextResponse } from 'next/server';



export default async function middleware(request: NextRequest) {

  try {
    const url = new URL(request.url);
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    if (!!code) {
      const authRequest = new NextRequest(new URL('/api/auth', request.url));

      authRequest.headers.set('code', code as string);
      const authResponse = await fetch(authRequest);
      const json = await authResponse.json();

      if (json.valid === true) {
        return fetch(url);
      }
    }
    return NextResponse.redirect(new URL('/invalid-code', request.url));
  } catch (e: any) {
    console.log(new Error(e));
  }
}

export const config = {
  matcher: ['/:path']
}

