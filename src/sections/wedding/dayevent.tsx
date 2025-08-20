import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { weddingData } from './weddingData';

// Styled Components
const RootStyle = styled('div')(({ theme }) => ({
    height: '97vh',
    display: 'flex',
    backgroundImage: `url('/assets/images/wedding/hoahongnhe.png')`,
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0.1), rgba(255,255,255,0.5))',
        zIndex: 1,
    },
}));

const BackgroundNumbers = styled(motion.div)(() => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  textAlign: 'center',
  fontFamily: 'Playfair Display, serif',
  '& .number': {
    fontSize: 'clamp(200px, 25vw, 400px)',
    fontWeight: 300,
  color: '#928362',
    lineHeight: 0.8,
  },
}));

const Bubble = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: 'clamp(10px, 1vw, 20px)',
  height: 'clamp(10px, 1vw, 20px)',
  backgroundColor: '#f8d0e0',
  borderRadius: '50%',
}));

const NameStyle = styled(motion.h1)(() => ({
  fontFamily: 'Playfair Display, serif',
  fontSize: 'clamp(80px, 15vw, 100px)',
  fontWeight: 400,
  color: '#928362',
  opacity: 0.7,
  margin: 0
}));

const AndSign = styled(motion.p)(() => ({
  fontFamily: 'Oooh Baby, cursive',
  fontSize: 'clamp(80px, 10vw, 120px)',
  color: '#928362',
  marginBottom: '1rem',
  marginTop: '1rem',
}));

// Variants for animations
const heartBeatVariants = {
  initial: { opacity: 0.08, scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.08, 0.12, 0.08],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const waveEffectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: [50, -30, 0], // Hiệu ứng sóng biển nhẹ nhàng
    transition: {
      duration: 1.2,
      delay: i * 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

export function EventSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <RootStyle>
      {/* Background Numbers with Heartbeat Effect */}
      <BackgroundNumbers
        variants={heartBeatVariants}
        initial="initial"
        animate="pulse"
      >
        <div className="number">
          {weddingData.weddingDateDetails.day}

        </div>
        <div className="number">
          {weddingData.weddingDateDetails.month}

        </div>
        <div className="number">
          {weddingData.weddingDateDetails.yearnumber}

        </div>
      </BackgroundNumbers>

      {/* Floating Bubbles */}
      <Bubble custom={0} animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} sx={{ top: '20%', left: '10%', opacity: 0.2 }} />
      <Bubble custom={1} animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} sx={{ top: '32%', right: '16%', opacity: 0.15 }} />
      <Bubble custom={2} animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} sx={{ bottom: '32%', left: '20%', opacity: 0.2 }} />
      <Bubble custom={3} animate={{ y: [0, -20, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} sx={{ bottom: '40%', right: '24%', opacity: 0.15 }} />

      {/* Couple Names - Foreground with Wave Effect */}
      <Box ref={ref} sx={{ textAlign: 'center', zIndex: 10, p: 2 }}>
        <NameStyle
          variants={waveEffectVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0} // Dành cho "Ân"
        >
          {weddingData.groom.nameOnly}
        </NameStyle>

        <AndSign
          variants={waveEffectVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1} // Dành cho "&"
        >
          &
        </AndSign>

        <NameStyle
          variants={waveEffectVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2} // Dành cho "Hạ"
        >
          {weddingData.bride.nameOnly}
        </NameStyle>
      </Box>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: '1rem', zIndex: 10 }}
      >
        <ChevronDown style={{ width: '24px', height: '24px', color: '#ccc' }} />
      </motion.div>
    </RootStyle>
  );
}