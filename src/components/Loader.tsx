import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const mountains = mountainsRef.current;
    const text = textRef.current;

    if (loader && logo && text) {
      // Set initial states
      gsap.set(logo, { scale: 0, rotation: -180 });
      gsap.set(mountains, { y: 100, opacity: 0 });
      gsap.set(text, { y: 30, opacity: 0 });

      // Create loading timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(loader, {
            scale: 1.1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

      // Animate logo entrance
      tl.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      // Animate mountains
      .to(mountains, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8")
      // Animate text
      .to(text, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      // Loading progress animation
      .to({}, { duration: 1.5 });
    }
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-gradient-sky flex items-center justify-center overflow-hidden"
    >
      {/* Background floating elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-accent/30 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary-glow/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-1500"></div>

      {/* Main loader content */}
      <div className="text-center">
        {/* Logo/Icon */}
        <div 
          ref={logoRef}
          className="w-20 h-20 mx-auto mb-8 bg-gradient-mountain rounded-full flex items-center justify-center shadow-large"
        >
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
          </svg>
        </div>

        {/* Mountain silhouettes */}
        <div className="flex justify-center items-end mb-6 space-x-1">
          {[40, 60, 80, 50, 30].map((height, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) mountainsRef.current[i] = el;
              }}
              className="bg-gradient-to-t from-primary to-primary-glow rounded-t-full opacity-70"
              style={{
                width: '12px',
                height: `${height}px`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p 
          ref={textRef}
          className="text-lg font-medium text-foreground/80 tracking-wide"
        >
          Preparing your journey to Sikkim...
        </p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;