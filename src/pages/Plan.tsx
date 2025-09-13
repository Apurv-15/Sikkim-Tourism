import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Mountain, 
  Phone, 
  Mail, 
  Clock,
  Car,
  Camera,
  Heart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import GoogleStreetView from '../components/GoogleStreetView';
import sikkimHero1 from '@/assets/sikkim-hero-1.jpg';

// Uncomment when ChatBot component is ready
// import ChatBot from '../components/ChatBot';

gsap.registerPlugin(ScrollTrigger);

const Plan = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);

  const packages = [
    {
      name: 'Sacred Lakes & Monasteries',
      duration: '5 Days',
      group: '2-6 People',
      highlights: ['Tsomgo Lake', 'Rumtek Monastery', 'Gangtok City', 'Local Markets'],
      difficulty: 'Easy',
      icon: Heart,
    },
    {
      name: 'Valley of Flowers Trek',
      duration: '7 Days',
      group: '4-8 People',
      highlights: ['Yumthang Valley', 'Hot Springs', 'Alpine Camping', 'Photography'],
      difficulty: 'Moderate',
      icon: Mountain,
    },
    {
      name: 'Cultural Immersion',
      duration: '6 Days',
      group: '2-10 People',
      highlights: ['Monastery Stays', 'Local Festivals', 'Traditional Cooking', 'Handicrafts'],
      difficulty: 'Easy',
      icon: Users,
    },
  ];

  const essentialInfo = [
    {
      title: 'Best Time to Visit',
      info: 'March to May, September to December',
      icon: Calendar,
    },
    {
      title: 'Getting There',
      info: 'Fly to Bagdogra, then 4-hour drive to Gangtok',
      icon: Car,
    },
    {
      title: 'Permits Required',
      info: 'Inner Line Permit for protected areas',
      icon: MapPin,
    },
    {
      title: 'What to Pack',
      info: 'Warm clothes, comfortable shoes, camera',
      icon: Camera,
    },
  ];

  useEffect(() => {
    const header = headerRef.current;
    const map = mapRef.current;
    const packages = packagesRef.current;
    const contact = contactRef.current;

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

    if (map) {
      gsap.fromTo(map,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: map,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    packages.forEach((pkg, index) => {
      if (pkg) {
        gsap.fromTo(pkg,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pkg,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    if (contact) {
      gsap.fromTo(contact,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contact,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

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
            Plan Your
            <span className="block bg-gradient-mountain bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Create unforgettable memories with our carefully crafted travel packages 
            and expert local guidance through the heart of the Himalayas.
          </p>
        </div>

        {/* Essential Information */}
        <div className="container mx-auto px-6 py-12">
          <div className="glass rounded-3xl p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Essential Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {essentialInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-white/10 rounded-lg transition-colors">
                  <info.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{info.title}</h3>
                    <p className="text-sm text-foreground/70">{info.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Experiences */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Curated Experiences
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Choose from our thoughtfully designed packages, each crafted to showcase the best of Sikkim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) packagesRef.current[index] = el;
                }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-mountain rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <pkg.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{pkg.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-foreground/60 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {pkg.group}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground/80 mb-1.5">Highlights</h4>
                  <div className="space-y-1.5">
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-xs text-foreground/60 flex items-start gap-1.5">
                        <span>•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-foreground/10">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                    pkg.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {pkg.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section - Temporarily Hidden */}
        {/*
        <div ref={contactRef} className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-foreground/70 mb-8">
                Get in touch with our travel experts to customize your perfect Sikkim experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-mountain text-white rounded-full font-semibold hover:shadow-large transition-all">
                  Contact Us
                </button>
                <button className="px-6 py-3 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-colors">
                  View Itinerary
                </button>
              </div>

              <div className="mt-8 space-y-4 text-sm text-foreground/70">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@sikkim-tours.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Uncomment when ChatBot is ready */}
        {/* <ChatBot /> */}
      </div>
    </div>
  );
};

export default Plan;
