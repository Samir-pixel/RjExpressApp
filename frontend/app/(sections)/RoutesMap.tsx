"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Cities with exact coordinates for 1000×589 map
const cities = [
  { name: "Newark", state: "NJ", x: 906, y: 184 },
  { name: "Philadelphia", state: "PA", x: 897, y: 199 },
  { name: "Baltimore", state: "MD", x: 882, y: 218 },
  { name: "Cincinnati", state: "OH", x: 764, y: 250 },
  { name: "Louisville", state: "KY", x: 744, y: 273 },
  { name: "Indianapolis", state: "IN", x: 735, y: 248 },
];

// Route data with distances, times, and highways - only 3 main routes
const routes = [
  { from: "Philadelphia", to: "Indianapolis", distance: 1031, timeFormatted: "10ч 52мин", highway: "I-76 W, I-70 W", color: "#FFD700" },
  { from: "Newark", to: "Cincinnati", distance: 996, timeFormatted: "10ч 54мин", highway: "I-95 S, I-76 W", color: "#FF6B35" },
  { from: "Baltimore", to: "Louisville", distance: 954, timeFormatted: "10ч 20мин", highway: "I-95 S, I-70 W", color: "#4ECDC4" }
];

export default function RoutesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGPathElement[]>([]);
  const citiesRef = useRef<SVGCircleElement[]>([]);
  const linesAnimatedRef = useRef<Set<number>>(new Set());
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Function to permanently fix line visibility
  const fixLineVisibility = useCallback((line: SVGPathElement) => {
    if (line) {
      // Remove dash array completely to show solid line
      line.removeAttribute("stroke-dasharray");
      line.removeAttribute("stroke-dashoffset");
      // Use setAttribute to ensure persistence
      line.setAttribute("stroke-dashoffset", "0");
      // Also set via style with !important to override any CSS
      line.style.setProperty("stroke-dashoffset", "0", "important");
      line.style.setProperty("stroke-dasharray", "none", "important");
      // Ensure opacity and visibility are set for visible lines
      line.style.setProperty("opacity", "1", "important");
      line.style.setProperty("visibility", "visible", "important");
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Animate map entrance
    gsap.fromTo(mapRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    // Wait for DOM to be ready, then start animations
    const startAnimations = () => {
      // STEP 1: Ensure ALL lines are completely hidden
      linesRef.current.forEach((line) => {
        if (line) {
          const pathLength = line.getTotalLength();
          if (pathLength > 0) {
            // Triple hide: attributes, style, and inline
            line.setAttribute("stroke-dasharray", `${pathLength}`);
            line.setAttribute("stroke-dashoffset", `${pathLength}`);
            line.style.strokeDasharray = `${pathLength}`;
            line.style.strokeDashoffset = `${pathLength}`;
            line.style.setProperty("opacity", "0", "important");
            line.style.setProperty("visibility", "hidden", "important");
          }
        }
      });

      // STEP 2: Initialize markers as hidden, then animate them FIRST
      citiesRef.current.forEach((city, i) => {
        if (city) {
          // Set initial hidden state
          gsap.set(city, {
            scale: 0,
            opacity: 0
          });
          
          // Then animate to visible
          gsap.to(city, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "back.out(1.7)"
          });
        }
      });
      
      // STEP 3: Calculate total time for markers: 6 * 0.2 + 0.8 = 2.0s
      // Add buffer time to ensure markers are fully visible
      const markersTotalTime = (cities.length - 1) * 0.2 + 0.8 + 0.5; // Last marker + buffer
      
      // STEP 4: Start line animations ONLY AFTER markers complete
      setTimeout(() => {
        linesRef.current.forEach((line, i) => {
          if (line && !linesAnimatedRef.current.has(i)) {
            const pathLength = line.getTotalLength();
            const lineIndex = i;
            
            if (pathLength > 0) {
              // Make line visible BEFORE starting animation
              line.style.setProperty("visibility", "visible", "important");
              line.style.setProperty("opacity", "1", "important");
              
              // Reset animation state
              line.setAttribute("stroke-dasharray", `${pathLength}`);
              line.setAttribute("stroke-dashoffset", `${pathLength}`);
              line.style.strokeDasharray = `${pathLength}`;
              line.style.strokeDashoffset = `${pathLength}`;
              
              // Animate line drawing
              gsap.to(line, {
                strokeDashoffset: 0,
                duration: 2.0, // Reduced to 2 seconds
                delay: 0,
                ease: "linear", // Constant speed - no acceleration
                onComplete: () => {
                  linesAnimatedRef.current.add(lineIndex);
                  fixLineVisibility(line);
                }
              });
            }
          }
        });
      }, markersTotalTime * 1000);
    };

    // Start animations after map entrance completes
    setTimeout(startAnimations, 500);
  }, [fixLineVisibility]);

  // Ensure animated lines stay visible (fix them frequently)
  useEffect(() => {
    const interval = setInterval(() => {
      linesRef.current.forEach((line, index) => {
        if (line && linesAnimatedRef.current.has(index)) {
          fixLineVisibility(line);
        }
      });
    }, 50); // Check every 50ms (more frequent)

    return () => clearInterval(interval);
  }, [fixLineVisibility]);

  // Cleanup mouse move timeout on unmount
  useEffect(() => {
    return () => {
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  // Throttle mouse move to prevent excessive re-renders
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Only update if position changed significantly (reduce re-renders)
    const dx = Math.abs(newPosition.x - lastMousePositionRef.current.x);
    const dy = Math.abs(newPosition.y - lastMousePositionRef.current.y);
    
    if (dx > 5 || dy > 5) {
      lastMousePositionRef.current = newPosition;
      
      // Throttle updates
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
      
      mouseMoveTimeoutRef.current = setTimeout(() => {
        setMousePosition(newPosition);
      }, 16); // ~60fps
    }
  }, []);

  return (
    <section id="routes" className="py-16 bg-[#0B1221] text-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FFD700] mb-4">
            Our Driving Routes
          </h2>
          <p className="text-lg text-gray-300">
            Hover over routes to see details
          </p>
        </motion.div>

        <div ref={mapRef} className="relative" onMouseMove={handleMouseMove} onClick={() => setSelectedCity(null)}>
          {/* USA Map */}
          <img 
            src="/images/usa-map.svg" 
            alt="USA Map" 
            className="w-full h-auto opacity-90 drop-shadow-md"
          />
          
          {/* Interactive Overlay */}
          <svg
            viewBox="0 0 1000 589"
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "all" }}
          >
            {/* Route Lines */}
            {routes.map((route, index) => {
              const fromCity = cities.find(c => c.name === route.from);
              const toCity = cities.find(c => c.name === route.to);
              
              if (!fromCity || !toCity) return null;

              // Use color from route data
              const strokeColor = route.color;

              return (
                <path
                  key={`${route.from}-${route.to}`}
                  ref={el => { 
                    if (el) {
                      linesRef.current[index] = el;
                      
                      // CRITICAL: Don't reinitialize if line was already animated!
                      if (linesAnimatedRef.current.has(index)) {
                        // Line was already animated, just fix it to stay visible
                        fixLineVisibility(el);
                        el.style.setProperty("opacity", "1", "important");
                        el.style.setProperty("visibility", "visible", "important");
                        return;
                      }
                      
                      // ALWAYS hide new lines initially - no exceptions!
                      const pathLength = el.getTotalLength();
                      if (pathLength > 0) {
                        // Force hide line immediately
                        el.style.opacity = "0";
                        el.style.visibility = "hidden";
                        el.setAttribute("stroke-dasharray", `${pathLength}`);
                        el.setAttribute("stroke-dashoffset", `${pathLength}`);
                        el.style.strokeDasharray = `${pathLength}`;
                        el.style.strokeDashoffset = `${pathLength}`;
                      }
                    }
                  }}
                  style={{
                    filter: `drop-shadow(0 0 6px ${strokeColor})`,
                    opacity: 0,
                    visibility: 'hidden'
                  }}
                  d={`M ${fromCity.x} ${fromCity.y} Q ${(fromCity.x + toCity.x) / 2} ${(fromCity.y + toCity.y) / 2 - 50} ${toCity.x} ${toCity.y}`}
                  stroke={strokeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  className="cursor-pointer transition-all duration-300 hover:stroke-[#FFFFFF] hover:stroke-[4]"
                  onMouseEnter={() => setHoveredRoute(index)}
                  onMouseLeave={() => setHoveredRoute(null)}
                />
              );
            })}

            {/* City Markers */}
            {cities.map((city, index) => {
              // City colors matching the routes
              const getCityColor = (cityName: string) => {
                if (cityName === "Philadelphia" || cityName === "Indianapolis") return "#FFD700";
                if (cityName === "Newark" || cityName === "Cincinnati") return "#FF6B35";
                if (cityName === "Baltimore" || cityName === "Louisville") return "#4ECDC4";
                return "#FFD700"; // default color
              };
              const cityColor = getCityColor(city.name);
              const isHovered = hoveredCity === city.name;

              return (
                <g 
                  key={city.name}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* City Dot */}
                  <circle
                    ref={el => { 
                      if (el) {
                        citiesRef.current[index] = el;
                      }
                    }}
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? "8" : "6"}
                    fill={cityColor}
                    stroke="#FFFFFF"
                    strokeWidth={isHovered ? "3" : "2"}
                    className="cursor-pointer transition-all duration-300 shadow-lg"
                    style={{
                      filter: `drop-shadow(0 0 ${isHovered ? "12px" : "6px"} ${cityColor})`,
                    }}
                  />

                  {/* City Label - Always visible when hovered, desktop only when not */}
                  <text
                    x={city.name === "Baltimore" ? city.x - 30 : city.x}
                    y={city.y - (city.name === "Indianapolis" ? 45 : city.name === "Cincinnati" ? 25 : city.name === "Louisville" ? 40 : city.name === "Newark" ? 30 : city.name === "Philadelphia" ? 35 : city.name === "Baltimore" ? 30 : 35)}
                    textAnchor="middle"
                    className={`${isHovered ? "block" : "hidden md:block"} font-bold pointer-events-none`}
                    fill={isHovered ? cityColor : "white"}
                    style={{
                      textShadow: isHovered 
                        ? `2px 2px 4px rgba(0,0,0,0.9), 0 0 10px ${cityColor}` 
                        : "2px 2px 4px rgba(0,0,0,0.9)",
                      fontSize: isHovered ? "16px" : "14px",
                    }}
                  >
                    {city.name}
                  </text>

                  {/* State Label - Always visible when hovered, desktop only when not */}
                  <text
                    x={city.name === "Baltimore" ? city.x - 30 : city.x}
                    y={city.y + (city.name === "Indianapolis" ? 40 : city.name === "Cincinnati" ? 35 : city.name === "Louisville" ? 35 : city.name === "Newark" ? 35 : city.name === "Philadelphia" ? 35 : city.name === "Baltimore" ? 35 : 30)}
                    textAnchor="middle"
                    className={`${isHovered ? "block" : "hidden md:block"} font-semibold pointer-events-none`}
                    fill={isHovered ? cityColor : "#FFD700"}
                    style={{
                      textShadow: isHovered 
                        ? `2px 2px 4px rgba(0,0,0,0.9), 0 0 8px ${cityColor}` 
                        : "1px 1px 2px rgba(0,0,0,0.8)",
                      fontSize: isHovered ? "14px" : "12px",
                    }}
                  >
                    {city.state}
                  </text>

                  {/* Highlighted background when hovered */}
                  {isHovered && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="20"
                      fill="none"
                      stroke={cityColor}
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}

            {/* Animated Truck */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.text
                x={cities[1].x} // Start from Philadelphia
                y={cities[1].y + 5}
                textAnchor="middle"
                className="text-xl"
                animate={{
                  x: [cities[1].x, cities[3].x, cities[1].x], // Philly → Cincinnati → Philly
                  y: [cities[1].y + 5, cities[3].y + 5, cities[1].y + 5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                🚛
              </motion.text>
            </motion.g>
          </svg>

          {/* Floating Info Card */}
          {hoveredRoute !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute pointer-events-none z-10"
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y - 20,
                transform: 'translate(-50%, -100%)',
                width: '280px',
                minHeight: '140px'
              }}
            >
              <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-xl w-full">
                <div className="text-white">
                  <h3 className="font-bold text-[#FFD700] mb-2 text-lg">
                    {routes[hoveredRoute].from} → {routes[hoveredRoute].to}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Время:</span>
                      <span className="text-white font-semibold">{routes[hoveredRoute].timeFormatted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Расстояние:</span>
                      <span className="text-white font-semibold">{routes[hoveredRoute].distance} км</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Highway:</span>
                      <span className="text-white font-semibold">{routes[hoveredRoute].highway}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}