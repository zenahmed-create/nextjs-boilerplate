// /app/components/HeroSection.tsx

'use client';

import { ChevronRight, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleWords((prev) => Math.min(prev + 1, 3));
    }, 500);

    return () => clearTimeout(timer);
  }, [visibleWords]);

  useEffect(() => {
    // Start playing the video when the component mounts
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Auto-play was prevented:", error);
        // Optionally handle the error, e.g., show a play button
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const words = ['Read', 'Click', 'Understand'];

  return (
    <section className="container mx-auto px-4 pt-32 pb-20 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
        {words.map((word, index) => (
          <span
            key={word}
            className={`inline-block transition-opacity duration-500 ${
              index < visibleWords ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: `${index * 500}ms` }}
          >
            {word}{index < 2 ? ', ' : '.'}
          </span>
        ))}
      </h1>
      <h2 className="text-2xl md:text-3xl text-gray-600 mb-12">
        Meet Ben, by UNDRSTnD - Your AI Reading Companion!
      </h2>
      <div className="flex justify-center mb-12">
        <a
          href="https://chromewebstore.google.com/detail/contextual-term-explorer/jckkhbhfmmlpbfnapjkofppliobejoii"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-gradient-to-b from-gray-900 to-gray-800 
            hover:bg-gradient-to-b hover:from-[#ff5c00] hover:to-[#ff5c00]
            text-white text-lg font-semibold
            px-8 py-4 rounded-md
            shadow-md hover:shadow-lg
            transition-all duration-300 ease-in-out
            transform hover:-translate-y-1 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50
            active:bg-gray-800
            flex items-center justify-center space-x-2
            w-72
          "
        >
          <span>Ask Ben Now</span>
          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="max-w-4xl mx-auto relative">
        <div 
          className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <video
            ref={videoRef}
            src="/undrstndproductdemo2.mp4"
            className="w-full h-full object-cover"
            preload="auto"
            muted // Add this to allow autoplay in most browsers
            playsInline // Add this for better mobile support
            onClick={togglePlay}
          >
            Your browser does not support the video tag.
          </video>
          {(!isPlaying || isHovering) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="bg-white bg-opacity-75 rounded-full p-4 text-gray-900 hover:bg-opacity-100 transition-all duration-300 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
