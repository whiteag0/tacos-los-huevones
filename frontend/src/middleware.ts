import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password protection - use environment variable (set SITE_PASSWORD in Vercel)
// Leave empty or unset to disable password protection
const SITE_PASSWORD = process.env.SITE_PASSWORD || '';

export function middleware(request: NextRequest) {
  // Skip if no password is set (public site)
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
    <html lang="en">
      <head>
        <title>Tacos Los Huevones | Enter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Authentic Mexican Street Food in Parker, Colorado">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }

          /* Background image with overlay */
          .bg-image {
            position: fixed;
            inset: 0;
            background-image: url('https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=1920&q=80');
            background-size: cover;
            background-position: center;
            z-index: -2;
          }

          .bg-overlay {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%);
            z-index: -1;
          }

          /* Glass card */
          .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 48px 40px;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            text-align: center;
            max-width: 420px;
            width: 100%;
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Logo container */
          .logo-container {
            margin-bottom: 24px;
          }

          .logo-icon {
            font-size: 56px;
            margin-bottom: 8px;
            display: block;
          }

          /* Title with gradient */
          .title {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 4px;
            color: #1a1a1a;
            letter-spacing: -0.5px;
          }

          .title-gradient {
            background: linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .subtitle {
            color: #6b7280;
            font-size: 15px;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .location {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #9ca3af;
            font-size: 13px;
            margin-bottom: 32px;
          }

          .location svg {
            width: 14px;
            height: 14px;
          }

          /* Divider */
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 0 0 32px 0;
          }

          /* Form styles */
          form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .input-wrapper {
            position: relative;
          }

          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            pointer-events: none;
          }

          input {
            width: 100%;
            padding: 16px 16px 16px 48px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 16px;
            font-family: inherit;
            outline: none;
            transition: all 0.2s ease;
            background: #fafafa;
          }

          input:focus {
            border-color: #dc2626;
            background: white;
            box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
          }

          input::placeholder {
            color: #9ca3af;
          }

          button {
            padding: 16px 24px;
            background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.3);
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px 0 rgba(220, 38, 38, 0.4);
          }

          button:active {
            transform: translateY(0);
          }

          button svg {
            width: 20px;
            height: 20px;
          }

          /* Footer info */
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f3f4f6;
          }

          .hours {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin-bottom: 16px;
          }

          .hours-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #fef3c7;
            color: #92400e;
            font-size: 12px;
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 20px;
          }

          .hours-pill svg {
            width: 12px;
            height: 12px;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #dcfce7;
            color: #166534;
            font-size: 12px;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 20px;
          }

          .badge-dot {
            width: 6px;
            height: 6px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          /* Responsive */
          @media (max-width: 480px) {
            .card {
              padding: 36px 24px;
            }
            .title {
              font-size: 28px;
            }
            .hours {
              flex-direction: column;
              align-items: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="bg-image"></div>
        <div class="bg-overlay"></div>

        <div class="card">
          <div class="logo-container">
            <span class="logo-icon">🌮</span>
            <h1 class="title">
              <span>Tacos</span>
              <span class="title-gradient"> Los Huevones</span>
            </h1>
            <p class="subtitle">Authentic Mexican Street Food</p>
            <span class="location">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              Parker, Colorado
            </span>
          </div>

          <div class="divider"></div>

          <form method="GET">
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input type="password" name="password" placeholder="Enter access code" required autofocus>
            </div>
            <button type="submit">
              Enter Site
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </form>

          <div class="footer">
            <div class="hours">
              <span class="hours-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon-Sat 8am-7pm
              </span>
              <span class="hours-pill">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Sun 8am-3pm
              </span>
            </div>
            <span class="badge">
              <span class="badge-dot"></span>
              Now Taking Online Orders
            </span>
          </div>
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
