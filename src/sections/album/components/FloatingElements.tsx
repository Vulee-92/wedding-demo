// src/sections/album/components/FloatingElements.tsx
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ count = 15 }) => {
  const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '💮'];
  const hearts = ['💖', '💕', '💗', '💝', '💘'];

  return (
    <>
      {/* Floating petals */}
      {Array.from({ length: Math.floor(count * 0.6) }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          initial={{ 
            opacity: 0, 
            y: -50, 
            x: Math.random() * (window.innerWidth || 1200),
            rotate: 0,
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            opacity: [0, 0.7, 0.9, 0.7, 0],
            y: (window.innerHeight || 800) + 50,
            x: Math.random() * (window.innerWidth || 1200) + Math.sin(i) * 100,
            rotate: [0, 180, 360],
            scale: [0.5 + Math.random() * 0.5, 0.8 + Math.random() * 0.4],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            fontSize: `${14 + Math.random() * 8}px`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {petals[Math.floor(Math.random() * petals.length)]}
        </motion.div>
      ))}
      
      {/* Floating hearts */}
      {Array.from({ length: Math.floor(count * 0.4) }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{ 
            opacity: 0, 
            y: (window.innerHeight || 800) + 50, 
            x: Math.random() * (window.innerWidth || 1200),
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            opacity: [0, 0.6, 0.8, 0.6, 0],
            y: -50,
            x: Math.random() * (window.innerWidth || 1200) + Math.cos(i) * 120,
            scale: [0.5 + Math.random() * 0.5, 0.8 + Math.random() * 0.4],
            rotate: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 10 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
          style={{
            position: 'absolute',
            fontSize: `${12 + Math.random() * 6}px`,
            color: '#ff69b4',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {hearts[Math.floor(Math.random() * hearts.length)]}
        </motion.div>
      ))}

      {/* Floating sparkles */}
      {Array.from({ length: Math.floor(count * 0.3) }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * (window.innerWidth || 1200),
            y: Math.random() * (window.innerHeight || 800),
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            fontSize: `${8 + Math.random() * 4}px`,
            color: '#ffd700',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating bubbles */}
      {Array.from({ length: Math.floor(count * 0.2) }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          initial={{
            opacity: 0,
            scale: 0.3,
            x: Math.random() * (window.innerWidth || 1200),
            y: (window.innerHeight || 800) + 20,
          }}
          animate={{
            opacity: [0, 0.3, 0.5, 0.3, 0],
            scale: [0.3, 0.6, 0.8, 1, 0.2],
            y: -50,
            x: Math.random() * (window.innerWidth || 1200) + Math.sin(i * 2) * 80,
          }}
          transition={{
            duration: 12 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut",
          }}
          style={{
            position: 'absolute',
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
            border: '1px solid rgba(255,255,255,0.3)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
};

export { FloatingElements };