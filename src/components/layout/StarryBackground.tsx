
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDelay: string;
  animationDuration: string;
  baseOpacity: number;
}

interface Planet {
  id: string;
  top: string;
  left: string;
  size: string;
  gradientColors: string[];
  animationName: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

const NUM_STARS = 250; // Increased number of stars
const NUM_PLANETS = 4;

const planetColorSchemes: string[][] = [
  ['#A0522D', '#8B4513', '#5E2605'], // Sienna, SaddleBrown, DarkerBrown (Earthy/Rocky)
  ['#B0E0E6', '#87CEEB', '#4682B4'], // PowderBlue, SkyBlue, SteelBlue (Icy/Gas Giant)
  ['#FF7F50', '#CD5C5C', '#B22222'], // Coral, IndianRed, Firebrick (Mars-like)
  ['#F0E68C', '#DAA520', '#B8860B'], // Khaki, Goldenrod, DarkGoldenrod (Golden/Gas Giant)
];

const planetAnimations = [
  'planet-drift-1',
  'planet-drift-2',
  'planet-gentle-arc-1',
  'planet-drift-3'
];

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [mouseActive, setMouseActive] = useState(false);
  const mouseActivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < NUM_STARS; i++) {
        let baseOpacityValue: number;
        // ~30% of stars are more consistently visible
        if (i < NUM_STARS * 0.3) { 
          baseOpacityValue = Math.random() * 0.3 + 0.25; // 0.25 to 0.55
        } else { 
        // ~70% of stars are fainter and appear more on mouse move
          baseOpacityValue = Math.random() * 0.09 + 0.01; // 0.01 to 0.1
        }
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 1.5 + 0.5}px`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          baseOpacity: baseOpacityValue,
        });
      }
      setStars(newStars);
    };

    const generatePlanets = () => {
      const newPlanets: Planet[] = [];
      const usedPositions: { top: number, left: number }[] = [];

      for (let i = 0; i < NUM_PLANETS; i++) {
        let top, left, positionOkay;
        do {
          top = Math.random() * 80 + 10;
          left = Math.random() * 80 + 10;
          positionOkay = !usedPositions.some(p => Math.abs(p.top - top) < 20 && Math.abs(p.left - left) < 20);
        } while (!positionOkay);
        
        usedPositions.push({top, left});

        newPlanets.push({
          id: `planet-${i}`,
          top: `${top}%`,
          left: `${left}%`,
          size: `${Math.random() * 25 + 30}px`, // Slightly larger planets
          gradientColors: planetColorSchemes[i % planetColorSchemes.length],
          animationName: planetAnimations[i % planetAnimations.length],
          animationDuration: `${Math.random() * 60 + 60}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: Math.random() * 0.25 + 0.65, // Opacity between 0.65 and 0.9
        });
      }
      setPlanets(newPlanets);
    };

    generateStars();
    generatePlanets();

    const handleMouseMove = () => {
      setMouseActive(true);
      if (mouseActivityTimerRef.current) {
        clearTimeout(mouseActivityTimerRef.current);
      }
      mouseActivityTimerRef.current = setTimeout(() => {
        setMouseActive(false);
      }, 250); // Mouse considered inactive after 250ms
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseActivityTimerRef.current) {
        clearTimeout(mouseActivityTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {stars.map((star) => {
        // Boost opacity significantly when mouse is active to make faint stars appear
        const currentOpacity = mouseActive 
          ? Math.min(1, star.baseOpacity + 0.6) // Increased boost
          : star.baseOpacity;
        return (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationName: 'star-twinkle',
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              opacity: currentOpacity,
              transition: 'opacity 0.3s ease-out', 
            }}
          />
        );
      })}
      {planets.map((planet) => (
        <div
          key={planet.id}
          className="absolute rounded-full"
          style={{
            top: planet.top,
            left: planet.left,
            width: planet.size,
            height: planet.size,
            backgroundImage: `radial-gradient(circle at 30% 30%, ${planet.gradientColors[0]}, ${planet.gradientColors[1]} 60%, ${planet.gradientColors[2]})`,
            boxShadow: `
              0 0 ${parseFloat(planet.size) * 0.3}px ${parseFloat(planet.size) * 0.1}px ${planet.gradientColors[0]}30,
              0 0 ${parseFloat(planet.size) * 0.6}px ${parseFloat(planet.size) * 0.2}px ${planet.gradientColors[1]}20,
              inset -${parseFloat(planet.size) * 0.1}px -${parseFloat(planet.size) * 0.1}px ${parseFloat(planet.size) * 0.2}px rgba(0,0,0,0.15)
            `,
            animationName: planet.animationName,
            animationDuration: planet.animationDuration,
            animationDelay: planet.animationDelay,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: planet.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
