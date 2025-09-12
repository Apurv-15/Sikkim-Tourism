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
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const images = imagesRef.current;

    if (hero && title && subtitle && cta) {
      // Set initial states with zoom effect
      gsap.set(hero, { scale: 1.2, opacity: 0 });
      gsap.set([title, subtitle, cta], { opacity: 0, y: 50 });
      gsap.set(images, { opacity: 0, scale: 0.8, rotation: 15 });

      // Create main timeline with zoom in effect
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Zoom in effect for entire hero section
      tl.to(hero, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      });

      // Animate images in arc formation with stagger
      tl.to(images, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      })
      // Animate text content
      .to(title, {
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
              ease: "power2.out"
            });
          });

          img.addEventListener('mouseleave', () => {
            gsap.to(img, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-sky overflow-hidden pt-24"
    >
      {/* Arc Gallery */}
      <div className="relative w-full h-96 mb-16">
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
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-large ring-2 ring-white/20 hover:ring-primary/50 transition-all duration-300">
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
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Discover the
          <span className="block bg-gradient-mountain bg-clip-text text-transparent">
            Magic of Sikkim
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Journey through pristine mountains, sacred lakes, ancient monasteries, 
          and vibrant cultures in India's most enchanting Himalayan state.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate('/destinations')}
            className="px-8 py-4 bg-gradient-mountain text-white rounded-full font-semibold text-lg shadow-large hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Your Adventure
          </button>
          <button className="px-8 py-4 glass rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Watch Stories
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary-glow rounded-full animate-pulse delay-2000"></div>
    </section>
  );
};

export default SikkimArcHero;