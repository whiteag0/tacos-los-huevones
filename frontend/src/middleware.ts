import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password protection - hardcoded for now until site goes public
const SITE_PASSWORD = 'tacos2026';

export function middleware(request: NextRequest) {
  // Skip if no password is set
  if (!SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('site-auth');
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check for password in query string (for initial auth)
  const password = request.nextUrl.searchParams.get('password');
  if (password === SITE_PASSWORD) {
    const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
    response.cookies.set('site-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  // Show password page
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Password Required</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
          }
          .logo { font-size: 64px; margin-bottom: 16px; }
          h1 { color: #dc2626; margin-bottom: 8px; font-size: 24px; }
          p { color: #6b7280; margin-bottom: 24px; }
          form { display: flex; flex-direction: column; gap: 12px; }
          input {
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.2s;
          }
          input:focus { border-color: #dc2626; }
          button {
            padding: 12px 24px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          button:hover { background: #b91c1c; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">🌮</div>
          <h1>Tacos Los Huevones</h1>
          <p>This site is currently private.<br>Enter the password to continue.</p>
          <form method="GET">
            <input type="password" name="password" placeholder="Enter password" required autofocus>
            <button type="submit">Enter Site</button>
          </form>
        </div>
      </body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
