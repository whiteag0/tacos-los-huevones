'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl transform -rotate-12">🌮</div>
        <div className="absolute top-20 right-20 text-8xl transform rotate-12">🌯</div>
        <div className="absolute bottom-10 left-1/4 text-7xl transform rotate-6">🌶️</div>
        <div className="absolute bottom-20 right-1/3 text-8xl transform -rotate-6">🥑</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tacos Los Huevones
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">
            Authentic Mexican Street Food
          </p>
          <p className="text-lg mb-8 opacity-75">
            📍 Parker, Colorado
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#tacos"
              className="bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              View Menu
            </Link>
            <Link
              href="#location"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition"
            >
              Find Us
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              <span>Mon-Sat 8am-7pm, Sun 8am-3pm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Order Online for Pickup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#fffbf5"
          />
        </svg>
      </div>
    </section>
  );
}
