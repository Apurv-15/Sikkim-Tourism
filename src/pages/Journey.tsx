import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Mountain, Church } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Card, CardContent } from '../components/ui/card';
import { regionsData } from '../data/monasteries';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (header) {
      gsap.fromTo(header, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          delay: 0.5
        }
      );
    }

    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.8 + (index * 0.2),
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getRegionIcon = (regionId: string) => {
    switch (regionId) {
      case 'east': return <Compass className="w-8 h-8 text-primary" />;
      case 'west': return <Mountain className="w-8 h-8 text-primary" />;
      case 'south': return <Church className="w-8 h-8 text-primary" />;
      case 'north': return <MapPin className="w-8 h-8 text-primary" />;
      default: return <Church className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-sky pt-24">
        {/* Header */}
        <div ref={headerRef} className="text-center py-16 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Start Your
            <span className="block bg-gradient-mountain bg-clip-text text-transparent">
              Sacred Journey
            </span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Discover Sikkim's spiritual treasures across four distinct regions. Each holds ancient 
            monasteries, sacred lakes, and breathtaking mountain landscapes waiting to be explored.
          </p>
        </div>

        {/* Region Cards */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {regionsData.map((region, index) => (
              <div
                key={region.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <Link to={`/${region.id}-sikkim`} className="block group">
                  <Card className="overflow-hidden border-0 bg-transparent shadow-none group-hover:scale-[1.02] transition-all duration-300">
                    <div className="relative h-80 overflow-hidden rounded-3xl">
                      <img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Special Badge for North Sikkim */}
                      {region.specialNote && (
                        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                          <span className="text-white text-xs font-medium">Permit Required</span>
                        </div>
                      )}
                      
                      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-3 mb-3">
                          {getRegionIcon(region.id)}
                          <h2 className="text-2xl font-bold">{region.name}</h2>
                        </div>
                        <p className="text-lg font-medium text-white/90 mb-2">
                          {region.subtitle}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                          {region.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Church className="w-4 h-4" />
                              <span className="text-sm">{region.monasteries.length} Sites</span>
                            </div>
                          </div>
                          <div className="px-4 py-2 bg-gradient-mountain rounded-full text-sm font-medium hover:shadow-large transition-all duration-300">
                            Explore Now →
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-16">
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-4">Sacred Journey Experience</h3>
              <p className="text-foreground/70 leading-relaxed">
                Each region offers unique spiritual experiences, from ancient monasteries to sacred lakes. 
                Use our interactive features to plan your perfect pilgrimage through the Eastern Himalayas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;