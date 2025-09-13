import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import sikkimHero1 from '@/assets/sikkim-hero-1.jpg';
import tsomgoLake from '@/assets/tsomgo-lake.jpg';
import yumthangValley from '@/assets/yumthang-valley.jpg';
import monastery from '@/assets/monastery.jpg';
import sikkimFood from '@/assets/sikkim-food.jpg';

const SikkimArcHero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const sikkimImages = [
    { src: sikkimHero1, alt: 'Sikkim Mountains' },
    { src: tsomgoLake, alt: 'Tsomgo Lake' },
    { src: yumthangValley, alt: 'Yumthang Valley' },
    { src: monastery, alt: 'Tibetan Monastery' },
    { src: sikkimFood, alt: 'Sikkim Cuisine' },
    { src: sikkimHero1, alt: 'Snow Peaks' },
    { src: tsomgoLake, alt: 'Sacred Lake' },
    { src: yumthangValley, alt: 'Valley of Flowers' },
  ];

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const images = imagesRef.current;

    if (hero && video && overlay && title && subtitle && cta) {
      // Set initial states
      gsap.set(overlay, { opacity: 0.7 });
      gsap.set([title, subtitle, cta], { opacity: 0, y: 50 });
      gsap.set(images, { opacity: 0, scale: 0.8, rotation: 15 });

      // Play video
      video.play().catch(error => {
        console.log('Autoplay prevented, adding play button interaction');
      });

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Fade in overlay
      tl.fromTo(overlay,
        { opacity: 0 },
        { opacity: 0.7, duration: 2, ease: "power2.inOut" }
      );

      // Animate images in arc formation with stagger
      tl.to(images, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.5");
      
      // Animate text content
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      // Add hover animations for images
      images.forEach((img) => {
        if (img) {
          img.addEventListener('mouseenter', () => {
            gsap.to(img, {
              scale: 1.1,
              rotation: -5,
              duration: 0.3,
              ease: "power2.out",
              zIndex: 50
            });
          });

          img.addEventListener('mouseleave', () => {
            gsap.to(img, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
              zIndex: 'auto'
            });
          });
        }
      });
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden pt-32 md:pt-40"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => console.error("Video failed to load:", e)}
        >
          <source src="/videos/Sikkim-bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"
        />
      </div>

      {/* Arc Gallery */}
      <div className="relative w-full h-96 mb-16 z-10">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {sikkimImages.map((image, index) => {
            const angle = 20 + (index * 20); // degrees
            const angleRad = (angle * Math.PI) / 180;
            const radius = 320;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36"
                style={{
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: 'translate(-50%, 50%)',
                  zIndex: sikkimImages.length - index,
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-large ring-2 ring-white/20 hover:ring-primary/50 transition-all duration-300 backdrop-blur-sm">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-24 text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Discover the Magic of Sikkim
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
        >
          Experience the breathtaking beauty of the Himalayas, ancient monasteries, and vibrant culture in India's hidden gem.
        </p>
        <div ref={ctaRef} className="flex justify-center">
          <button 
            onClick={() => navigate('/destinations')}
            className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default SikkimArcHero;