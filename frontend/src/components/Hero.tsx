'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy load video - only start loading after component mounts and is visible
  useEffect(() => {
    // Use Intersection Observer to only load video when hero is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    // Fallback: load video after 1 second if intersection observer doesn't fire
    const timeout = setTimeout(() => setShouldLoadVideo(true), 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // iOS Safari requires explicit play() call for autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (video && shouldLoadVideo) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch {
          // Autoplay failed - this is expected on some browsers
          // Video will remain paused, fallback image is shown
        }
      };

      // Try to play immediately if video is ready
      if (video.readyState >= 3) {
        playVideo();
      }

      // Also try on canplay event for delayed load
      video.addEventListener('canplay', playVideo);

      return () => {
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, [shouldLoadVideo]);

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Poster image - shown immediately while video loads */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=1920&q=80')",
          }}
        />

        {/* Video element - lazy loaded */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm font-medium">Now Taking Online Orders</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block">Tacos</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400">
              Los Huevones
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-white/90 font-light max-w-2xl mx-auto">
            Authentic Mexican Street Food
          </p>

          <p className="text-lg mb-10 text-white/70 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Parker, Colorado
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#breakfast"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:-translate-y-0.5"
            >
              <span>Order Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#location"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Find Us
            </Link>
          </div>

          {/* Info Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Mon-Sat 8am-7pm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Sun 8am-3pm</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Online Ordering Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - removed animate-bounce for performance */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fffbf5] to-transparent z-10" />
    </section>
  );
}
