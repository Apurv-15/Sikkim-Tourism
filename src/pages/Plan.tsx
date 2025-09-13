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

        {/* Google Maps Street View Section */}
        <div ref={mapRef} className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Gangtok Virtually
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Take a virtual walk through Gangtok's streets and get a feel for this beautiful mountain city.
            </p>
          </div>
          
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
            <GoogleStreetView className="w-full h-96" />
          </div>
        </div>

        {/* Travel Packages */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Curated Experiences
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Choose from our thoughtfully designed packages, each crafted to showcase the best of Sikkim.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) packagesRef.current[index] = el;
                }}
                className="glass rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-mountain rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                
                {/* Package Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pkg.group}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
                  <div className="space-y-1">
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-sm text-foreground/70">
                        • {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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

        {/* Essential Information */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Essential Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialInfo.map((info, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <info.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                <p className="text-sm text-foreground/70">{info.info}</p>
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
