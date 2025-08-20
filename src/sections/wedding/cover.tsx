/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const WaveTransition = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -2,
  left: 0,
  width: '100%',
  height: '50px',
  zIndex: 2,
  overflow: 'hidden',
  '& svg': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fill: theme.palette.background.paper,
  },
}));
const BackgroundImage = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(8),
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  zIndex: 1,
  padding: theme.spacing(2),
  textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
}));

export function CoverSection() {
  const imageUrl =
    'https://res.cloudinary.com/dxfsa7foy/image/upload/v1755705635/fa2d4ce848666bc01533180bcaeb05df_u84myb.jpg'; // thay bằng ảnh cưới của anh

  return (
    <RootStyle>
      {/* Background */}
      <BackgroundImage>
        <img src={imageUrl} alt="Couple" />
      </BackgroundImage>

      <WaveTransition>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,122.7C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </WaveTransition>
      {/* Content */}
      <ContentWrapper>
        {/* SAVE THE DATE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              letterSpacing: '0.3rem',
            }}
          >
            SAVE THE DATE
          </Typography>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Typography
            sx={{
              fontFamily: "'Oooh Baby', cursive",
              fontSize: '3rem',
              mt: 1,
            }}
          >
            Martin & Chloe
          </Typography>
        </motion.div>

        {/* Date + Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              letterSpacing: '0.1rem',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            AUGUST 22, 2030
          </Typography>
          <Typography
            variant="body2"
            sx={{
              letterSpacing: '0.1rem',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            123 ANYWHERE., ANY CITY, ST 12345
          </Typography>
        </motion.div>
      </ContentWrapper>
    </RootStyle>
  );
}
