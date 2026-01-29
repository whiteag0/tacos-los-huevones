import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Tacos Los Huevones - Authentic Mexican Street Food';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Taco emoji */}
        <div style={{ fontSize: 120, marginBottom: 20 }}>🌮</div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            marginBottom: 10,
          }}
        >
          Tacos Los Huevones
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            marginBottom: 30,
          }}
        >
          Authentic Mexican Street Food
        </div>

        {/* Location badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.2)',
            padding: '12px 24px',
            borderRadius: 50,
            fontSize: 24,
            color: 'white',
          }}
        >
          <span>📍</span>
          <span>Parker, Colorado</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
