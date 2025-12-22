import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a, #020202)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          color: 'white',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: '-0.04em',
          }}
        >
          Idrissa Wade
        </h1>

        <p
          style={{
            fontSize: 36,
            color: '#00ff88',
            marginTop: 24,
          }}
        >
          Développeur Fullstack
        </p>

        <p
          style={{
            fontSize: 28,
            marginTop: 12,
            opacity: 0.85,
            textAlign: 'center',
          }}
        >
          React • Next.js • Node.js — Dakar 🇸🇳
        </p>

        <div
          style={{
            marginTop: 60,
            padding: '18px 28px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 16,
            fontSize: 22,
            width: 'auto',
          }}
        >
          Open to Work
        </div>

        <img
          src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1735669947/file_mji96e.jpg"
          alt="Idrissa Wade"
          style={{
            borderRadius: '50%',
            width: 120,
            height: 120,
            marginTop: 60,
            objectFit: 'cover',
            border: '3px solid #00ff88',
          }}
        />
      </div>
    ),
    size
  )
}
