// src/sections/album/components/PhotoBoothLayout.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoFrame from './PhotoFrame';

// Định nghĩa kiểu dữ liệu cho các hiệu ứng
type TransitionVariant = {
  initial: object;
  animate: object;
  exit: object;
};

interface PhotoBoothLayoutProps {
  imageUrls: string[];
  currentPhase: 'slideshow' | 'finalScroll';
  currentIndex: number;
  currentTransition: TransitionVariant;
}

const FINAL_SCROLL_DURATION = 4000;

// Các loại hiệu ứng thả tim
const heartIcons = ['❤️', '💖', '✨', '💐', '🕊️'];

const PhotoBoothLayout: React.FC<PhotoBoothLayoutProps> = ({
  imageUrls,
  currentPhase,
  currentIndex,
  currentTransition,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    // Tạo hiệu ứng thả tim mỗi khi ảnh chuyển
    if (currentPhase === 'slideshow') {
      const newHearts: any[] = [];
      const numHearts = isMobile ? 3 : 5;
      for (let i = 0; i < numHearts; i++) {
        newHearts.push({
          id: Math.random(),
          icon: heartIcons[Math.floor(Math.random() * heartIcons.length)],
          x: Math.random() * 100, // Vị trí x ngẫu nhiên từ 0-100%
          delay: Math.random() * 0.5 // Thêm delay ngẫu nhiên
        });
      }
      setHearts(newHearts);

      const timeout = setTimeout(() => {
        setHearts([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentPhase, isMobile]);

  const renderLayout = useCallback(() => {
    if (imageUrls.length === 0) {
      return null;
    }

    if (currentPhase === 'finalScroll') {
      const extendedPhotos = [...imageUrls, ...imageUrls, ...imageUrls];
      const column1 = extendedPhotos.filter((_, index) => index % 3 === 0);
      const column2 = extendedPhotos.filter((_, index) => index % 3 === 1);
      const column3 = extendedPhotos.filter((_, index) => index % 3 === 2);

      return (
        <motion.div
          key="final-scroll-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'black',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
              maxWidth: '1200px',
              overflow: 'hidden',
              p: 2,
            }}
          >
            {/* Cột 1: Cuộn lên */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                px: theme.spacing(1),
                animation: `slideUp ${FINAL_SCROLL_DURATION / 1000}s linear forwards`,
                position: 'relative',
                height: '200%',
                transform: 'translateY(0%)',
              }}
            >
              {column1.map((photo, index) => (
                <PhotoFrame
                  key={`col1-${index}`}
                  src={photo}
                  rotation={Math.random() * 6 - 3}
                  size={isMobile ? 'super_small' : 'medium'}
                />
              ))}
            </Box>
            {/* Cột 2: Cuộn xuống */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                px: theme.spacing(1),
                animation: `slideDown ${FINAL_SCROLL_DURATION / 1000}s linear forwards`,
                position: 'relative',
                height: '200%',
                transform: 'translateY(-100%)',
              }}
            >
              {column2.map((photo, index) => (
                <PhotoFrame
                  key={`col2-${index}`}
                  src={photo}
                  rotation={Math.random() * 6 - 3}
                  size={isMobile ? 'super_small' : 'medium'}
                />
              ))}
            </Box>
            {/* Cột 3: Cuộn lên */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                px: theme.spacing(1),
                animation: `slideUp ${FINAL_SCROLL_DURATION / 1000}s linear forwards`,
                position: 'relative',
                height: '200%',
                transform: 'translateY(0%)',
              }}
            >
              {column3.map((photo, index) => (
                <PhotoFrame
                  key={`col3-${index}`}
                  src={photo}
                  rotation={Math.random() * 6 - 3}
                  size={isMobile ? 'super_small' : 'medium'}
                />
              ))}
            </Box>
          </Box>
          <style>{`
            @keyframes slideUp {
              0% { transform: translateY(0%); }
              100% { transform: translateY(-50%); }
            }
            @keyframes slideDown {
              0% { transform: translateY(-50%); }
              100% { transform: translateY(0%); }
            }
          `}</style>
        </motion.div>
      );
    }

    if (isMobile) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-photo-${currentIndex}`}
            initial={currentTransition.initial}
            animate={currentTransition.animate}
            exit={currentTransition.exit}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PhotoFrame src={imageUrls[currentIndex]} rotation={Math.random() * 8 - 4} size="small" />
          </motion.div>
        </AnimatePresence>
      );
    }

    const desktopLayouts = [
      () => (
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-layout-single-${currentIndex}`}
            initial={currentTransition.initial}
            animate={currentTransition.animate}
            exit={currentTransition.exit}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PhotoFrame src={imageUrls[currentIndex]} rotation={Math.random() * 6 - 3} size="large" />
          </motion.div>
        </AnimatePresence>
      ),
      () => (
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-layout-double-${currentIndex}`}
            initial={currentTransition.initial}
            animate={currentTransition.animate}
            exit={currentTransition.exit}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={4} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <PhotoFrame src={imageUrls[currentIndex]} rotation={Math.random() * 8 - 4} size="medium" />
              <PhotoFrame src={imageUrls[(currentIndex + 1) % imageUrls.length]} rotation={Math.random() * 8 - 4} size="medium" delay={0.3} />
            </Stack>
          </motion.div>
        </AnimatePresence>
      ),
    ];

    const randomLayout = desktopLayouts[Math.floor(Math.random() * desktopLayouts.length)];
    return randomLayout();
  }, [currentPhase, currentIndex, imageUrls, isMobile, currentTransition, theme]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: isMobile ? 1 : 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hiển thị các tim động */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: 0, x: `${heart.x}%` }}
            animate={{ opacity: 0, scale: 1, y: -200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: heart.delay }}
            style={{
              position: 'absolute',
              bottom: '10%',
              fontSize: isMobile ? '2rem' : '3rem',
              pointerEvents: 'none',
              zIndex: 10,
              left: `${heart.x}%`,
              transform: `translateX(-50%)`,
            }}
          >
            {heart.icon}
          </motion.div>
        ))}
      </AnimatePresence>
      {renderLayout()}
    </Box>
  );
};

export default PhotoBoothLayout;