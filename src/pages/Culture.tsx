import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Mountain, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import monastery from '@/assets/monastery.jpg';
import sikkimHero1 from '@/assets/sikkim-hero-1.jpg';

gsap.registerPlugin(ScrollTrigger);

const Culture = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cultureGridRef = useRef<HTMLDivElement[]>([]);

  const festivals = [
    {
      name: 'Losar',
      month: 'February/March',
      description: 'Tibetan New Year celebrated with traditional dances, prayers, and feasts',
      significance: 'Most important festival marking the beginning of the Tibetan calendar',
    },
    {
      name: 'Saga Dawa',
      month: 'May/June',
      description: 'Buddhist festival commemorating Buddha\'s birth, enlightenment, and death',
      significance: 'Pilgrims circumambulate sacred sites and release animals',
    },
    {
      name: 'Drukpa Teshi',
      month: 'July/August',
      description: 'Celebrates Buddha\'s first sermon at Sarnath with religious ceremonies',
      significance: 'Monasteries perform special prayers and rituals',
    },
    {
      name: 'Dasain',
      month: 'September/October',
      description: 'Hindu festival celebrating the victory of good over evil',
      significance: 'Families reunite and seek blessings from elders',
    },
  ];

  const culturalElements = [
    {
      title: 'Ancient Monasteries',
      description: 'Centuries-old Buddhist monasteries perched on mountain ridges, preserving ancient wisdom and traditions.',
      image: monastery,
      icon: Mountain,
    },
    {
      title: 'Prayer Flags',
      description: 'Colorful flags fluttering in mountain winds, carrying prayers and mantras across the valleys.',
      image: sikkimHero1,
      icon: Heart,
    },
    {
      title: 'Sacred Rituals',
      description: 'Daily rituals of butter lamp offerings, chanting, and meditation that connect communities to the divine.',
      image: monastery,
      icon: Users,
    },
  ];

  useEffect(() => {
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const cultureGrid = cultureGridRef.current;

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

    if (timeline) {
      gsap.fromTo(timeline.children,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    cultureGrid.forEach((element, index) => {
      if (element) {
        gsap.fromTo(element,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-sky pt-24">
      {/* Header */}
      <div ref={headerRef} className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Culture &
          <span className="block bg-gradient-mountain bg-clip-text text-transparent">
            Festivals
          </span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Immerse yourself in the rich tapestry of Tibetan Buddhism, ancient traditions, 
          and colorful festivals that make Sikkim a spiritual sanctuary.
        </p>
      </div>

      {/* Cultural Elements Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {culturalElements.map((element, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cultureGridRef.current[index] = el;
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-large mb-6">
                <img
                  src={element.image}
                  alt={element.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-4 right-4 glass rounded-full p-3">
                  <element.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">{element.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Festival Timeline */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Festival Calendar
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Experience the spiritual rhythm of Sikkim through its sacred festivals and celebrations.
          </p>
        </div>

        <div ref={timelineRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {festivals.map((festival, index) => (
            <div
              key={index}
              className="relative glass rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              {/* Month Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">{festival.month}</span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">{festival.name}</h3>
              <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                {festival.description}
              </p>
              
              <div className="border-t border-white/20 pt-4">
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {festival.significance}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-mountain rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="glass rounded-3xl p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Experience Sacred Traditions
          </h2>
          <p className="text-foreground/70 mb-8">
            Join us for authentic cultural experiences and festival celebrations 
            that will connect you with Sikkim's spiritual heart.
          </p>
          <button className="px-8 py-3 bg-gradient-mountain text-white rounded-full font-semibold hover:shadow-large hover:scale-105 transition-all duration-300">
            Plan Cultural Tour
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Culture;