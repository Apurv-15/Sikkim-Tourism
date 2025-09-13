import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const SikkimArcHero = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const [sikkimImages, setSikkimImages] = useState<Array<{src: string, alt: string}>>([]);

  // Helper function to generate random rotation between -15 and 15 degrees
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 30) - 15;
  };

  // Helper function to generate random position for images
  const getRandomPosition = (index: number) => {
    const angle = (index / sikkimImages.length) * Math.PI * 2;
    const radius = 300 + Math.random() * 100; // Random radius between 300-400
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
    };
  };

  useEffect(() => {
    // Dynamically import all images from the landing page folder
    const imageModules = import.meta.glob('/src/assets/Landing page img/*.{jpg,jpeg,JPG,JPEG}');
    
    // Load all images
    Promise.all(
      Object.values(imageModules).map(mod => mod())
    ).then(modules => {
      const images = modules.map((mod: any) => ({
        src: mod.default,
        alt: 'Sikkim Landscape'
      }));
      
      // Ensure we have at least 8 images by duplicating if necessary
      const allImages = [
        ...images,
        ...images,
        ...images
      ].slice(0, 8);
      
      setSikkimImages(allImages);
    });
  }, []);

  useEffect(() => {
    if (sikkimImages.length === 0) return; // Don't run animation until images are loaded

    const hero = heroRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const images = Array.from(imagesRef.current).filter(Boolean);

    if (hero && video && overlay && title && subtitle && cta && images.length > 0) {
      // Set initial states
      gsap.set(overlay, { opacity: 0.7 });
      gsap.set([title, subtitle, cta], { opacity: 0, y: 50 });
      gsap.set(images, { opacity: 0, scale: 0.8, rotation: 15 });

      // Play video if it exists
      if (video) {
        video.play().catch(error => {
          console.log('Autoplay prevented, adding play button interaction');
        });
      }

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
      className="relative min-h-screen overflow-hidden pt-40 md:pt-48"
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
                className="absolute rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-1000 hover:scale-110 hover:z-10"
                style={{
                  width: '200px',
                  height: '150px',
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translateX(-50%) rotate(${getRandomRotation()}deg)`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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