import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Culture & Festivals', path: '/culture' },
    { name: 'Food & Lifestyle', path: '/food' },
    { name: 'Plan Your Trip', path: '/plan' },
  ];

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;

    if (nav && logo && links) {
      // Initial state
      gsap.set(nav, { y: -100, opacity: 0 });
      gsap.set(logo, { scale: 0, rotation: 180 });
      gsap.set(links.children, { y: -30, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline();
      
      tl.to(nav, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      })
      .to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to(links.children, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass rounded-b-2xl mx-4 mt-4"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-mountain rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-mountain bg-clip-text text-transparent">
              Sikkim
            </span>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-mountain transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/plan"
              className="px-6 py-2 bg-gradient-mountain text-white rounded-full font-medium text-sm transition-all duration-300 hover:shadow-large hover:scale-105"
            >
              Plan Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/plan"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 bg-gradient-mountain text-white rounded-full font-medium text-sm text-center"
              >
                Plan Trip
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;