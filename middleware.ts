import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROXY_PATH, SA_SCRIPT_URL, SA_NOSCRIPT_URL } from '@/lib/simple-analytics/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROXY_PATH)) {
    return NextResponse.next();
  }

  // Determine which Simple Analytics URL to proxy
  const targetUrl = pathname.includes('noscript.gif') ? SA_NOSCRIPT_URL : SA_SCRIPT_URL;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || '',
        'Accept': request.headers.get('Accept') || '*/*',
        'Accept-Language': request.headers.get('Accept-Language') || '',
        'Referer': request.headers.get('Referer') || '',
      },
    });

    // Copy the response and its headers
    const proxyResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Set CORS headers
    proxyResponse.headers.set('Access-Control-Allow-Origin', '*');
    proxyResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    proxyResponse.headers.set('Access-Control-Allow-Headers', '*');

    return proxyResponse;
  } catch (error) {
    console.error('Error proxying Simple Analytics request:', error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: '/_sa/:path*',
};