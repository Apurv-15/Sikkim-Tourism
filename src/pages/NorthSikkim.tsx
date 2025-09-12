import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Eye, MessageCircle, Shield, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import StreetViewModal from '../components/StreetViewModal';
import ChatBot from '../components/ChatBot';
import { regionsData } from '../data/monasteries';

gsap.registerPlugin(ScrollTrigger);

const NorthSikkim = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [streetViewModal, setStreetViewModal] = useState<{
    isOpen: boolean;
    monastery: any;
  }>({ isOpen: false, monastery: null });
  const [chatBot, setChatBot] = useState<{
    isOpen: boolean;
    context: string;
  }>({ isOpen: false, context: '' });

  const regionData = regionsData.find(region => region.id === 'north')!;

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

  const openStreetView = (monastery: any) => {
    setStreetViewModal({ isOpen: true, monastery });
  };

  const openChatBot = (monasteryName: string) => {
    setChatBot({ isOpen: true, context: `${monasteryName} in North Sikkim - Special permits required for this region` });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-300';
      case 'difficult': return 'bg-red-500/20 text-red-300';
      default: return 'bg-primary/20 text-primary';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-sky pt-24">
        {/* Header */}
        <div ref={headerRef} className="px-6 py-16">
          <div className="container mx-auto">
            <Link 
              to="/destinations" 
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-foreground hover:bg-white/20 transition-all duration-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Regions
            </Link>
            
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-12 h-12 text-primary mt-2" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                  {regionData.name}
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  {regionData.subtitle}
                </p>
                <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
                  {regionData.description}
                </p>
              </div>
            </div>
            
            {/* Special Notice */}
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">Special Permit Required</h3>
                  <p className="text-red-200/80 text-sm leading-relaxed">
                    All visitors to North Sikkim require special permits. Indian nationals need Inner Line Permits, 
                    while foreign nationals need Restricted Area Permits. Please contact local tourism authorities 
                    or use our planning assistant for permit assistance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Protected Region</span>
              </div>
              <div className="glass rounded-full px-4 py-2">
                <span className="text-sm font-medium">{regionData.monasteries.length} Remote Sites</span>
              </div>
              <div className="glass rounded-full px-4 py-2">
                <span className="text-sm font-medium">High Altitude</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monasteries Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid gap-8">
            {regionData.monasteries.map((monastery, index) => (
              <div
                key={monastery.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group"
              >
                <Card className={`overflow-hidden border-0 glass hover:shadow-large transition-all duration-500 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex`}>
                  {/* Image */}
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={monastery.image}
                      alt={monastery.name}
                      className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium text-sm">4.6</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-red-300 text-xs font-medium">Permit Required</span>
                    </div>
                    {monastery.difficulty === 'difficult' && (
                      <div className="absolute bottom-4 right-4 bg-orange-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-orange-300 text-xs font-medium">Extreme Altitude</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        {monastery.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{monastery.nearestTown}</span>
                        {monastery.altitude && (
                          <>
                            <span className="text-foreground/50">•</span>
                            <span className="text-foreground/70 font-semibold">{monastery.altitude}</span>
                          </>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-foreground/80 leading-relaxed mb-6">
                        {monastery.significance}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground/90 mb-3">Special Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {monastery.specialFeatures.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(monastery.difficulty || 'easy')}`}>
                            {monastery.difficulty || 'Easy'} Access
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => openStreetView(monastery)}
                          variant="outline"
                          size="sm"
                          className="glass border-white/20 hover:bg-white/20"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          360° View
                        </Button>
                        <Button
                          onClick={() => openChatBot(monastery.name)}
                          className="bg-gradient-mountain hover:shadow-large"
                          size="sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Get Permit Info
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Street View Modal */}
      <StreetViewModal
        isOpen={streetViewModal.isOpen}
        onClose={() => setStreetViewModal({ isOpen: false, monastery: null })}
        coordinates={streetViewModal.monastery?.coordinates}
        title={streetViewModal.monastery?.name || ''}
      />

      {/* ChatBot */}
      {chatBot.isOpen && (
        <ChatBot
          isAutoOpen={true}
          context={chatBot.context}
          onClose={() => setChatBot({ isOpen: false, context: '' })}
        />
      )}
    </div>
  );
};

export default NorthSikkim;