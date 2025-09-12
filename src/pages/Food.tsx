import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Coffee, Leaf, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import sikkimFood from '@/assets/sikkim-food.jpg';
import monastery from '@/assets/monastery.jpg';

gsap.registerPlugin(ScrollTrigger);

const Food = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const dishesRef = useRef<HTMLDivElement[]>([]);
  const lifestyleRef = useRef<HTMLDivElement[]>([]);

  const dishes = [
    {
      name: 'Momos',
      description: 'Steamed dumplings filled with vegetables or meat, served with spicy tomato chutney. A beloved comfort food that brings families together.',
      image: sikkimFood,
      type: 'Main Course',
      origin: 'Tibetan',
      ingredients: ['Flour', 'Vegetables/Meat', 'Ginger', 'Garlic'],
    },
    {
      name: 'Thukpa',
      description: 'Hearty noodle soup with vegetables and meat in a flavorful broth. Perfect for cold mountain evenings.',
      image: sikkimFood,
      type: 'Soup',
      origin: 'Tibetan',
      ingredients: ['Noodles', 'Broth', 'Vegetables', 'Spices'],
    },
    {
      name: 'Gundruk',
      description: 'Fermented leafy green vegetable soup, packed with probiotics and traditional mountain flavors.',
      image: sikkimFood,
      type: 'Soup',
      origin: 'Nepali',
      ingredients: ['Fermented Greens', 'Tomatoes', 'Chili', 'Garlic'],
    },
    {
      name: 'Butter Tea',
      description: 'Traditional salted tea with yak butter, providing warmth and energy at high altitudes.',
      image: sikkimFood,
      type: 'Beverage',
      origin: 'Tibetan',
      ingredients: ['Tea', 'Yak Butter', 'Salt', 'Milk'],
    },
  ];

  const lifestyle = [
    {
      title: 'Mountain Life',
      description: 'Life in harmony with nature, where every meal is a celebration of local ingredients and seasonal flavors.',
      image: monastery,
      icon: Leaf,
    },
    {
      title: 'Community Dining',
      description: 'Shared meals bring communities together, strengthening bonds through food and stories.',
      image: monastery,
      icon: Heart,
    },
    {
      title: 'Organic Farming',
      description: 'Traditional farming methods produce the freshest ingredients in pristine mountain air.',
      image: monastery,
      icon: Utensils,
    },
  ];

  useEffect(() => {
    const header = headerRef.current;
    const dishes = dishesRef.current;
    const lifestyleElements = lifestyleRef.current;

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

    dishes.forEach((dish, index) => {
      if (dish) {
        gsap.fromTo(dish,
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
              trigger: dish,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax effect on images
        const image = dish.querySelector('.parallax-image');
        if (image) {
          gsap.to(image, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: dish,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      }
    });

    lifestyleElements.forEach((element, index) => {
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
          Food &
          <span className="block bg-gradient-sunset bg-clip-text text-transparent">
            Lifestyle
          </span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Discover the authentic flavors and simple pleasures of mountain life, 
          where every meal tells a story of tradition and community.
        </p>
      </div>

      {/* Dishes Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Traditional Delicacies
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Savor the authentic tastes that have nourished mountain communities for generations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {dishes.map((dish, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) dishesRef.current[index] = el;
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-large mb-6 h-72">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="parallax-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-white" />
                  <span className="text-white font-medium text-sm">{dish.type}</span>
                </div>

                {/* Origin Badge */}
                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                  <span className="text-white font-medium text-sm">{dish.origin}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">{dish.name}</h3>
              <p className="text-foreground/70 leading-relaxed mb-4">{dish.description}</p>
              
              {/* Ingredients */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mountain Lifestyle
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Experience the peaceful rhythm of life in the Himalayas, where simplicity meets fulfillment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {lifestyle.map((element, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) lifestyleRef.current[index] = el;
              }}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-large mb-6">
                <img
                  src={element.image}
                  alt={element.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-full p-4">
                  <element.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">{element.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tea Culture Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Coffee className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Tea Culture
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              From the world-famous Darjeeling tea to traditional butter tea, 
              discover the rich tea heritage that defines Sikkim's social life.
            </p>
          </div>
          <button className="px-8 py-3 bg-gradient-sunset text-white rounded-full font-semibold hover:shadow-large hover:scale-105 transition-all duration-300">
            Join Tea Experience
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Food;