// src/sections/album/Slideshow.tsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Box, IconButton, Tooltip, Stack, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';

import WeddingBanner from './components/WeddingBanner';
import PhotoBoothLayout from './components/PhotoBoothLayout';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzuWs-OIZQFDqKHrrsKsG0F9NemvKTq0iDkogowTvwUPc-Ps1vKtuCgd0JMYD4_H4io/exec';

const MAIN_WEDDING_IMAGE = 'https://res.cloudinary.com/dxfsa7foy/image/upload/v1755702353/main_syy1vz.jpg';

interface ApiResponse {
  urls: string[];
}

interface SlideshowProps {
  imageUrls?: string[];
  initialIndex?: number;
  onClose?: () => void;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  weddingVenue?: string;
}

type SlidePhase = 'loading' | 'musicConsent' | 'intro' | 'slideshow' | 'finalScroll';

// Định nghĩa kiểu dữ liệu cho các hiệu ứng
type TransitionVariant = {
  initial: object;
  animate: object;
  exit: object;
};

const transitions: Record<string, TransitionVariant> = {
  fadeIn: { initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } },
  slideUp: { initial: { y: 100, opacity: 0, rotate: 1 }, animate: { y: 0, opacity: 1, rotate: 0 }, exit: { y: -100, opacity: 0, rotate: -1 } },
  rotateIn: { initial: { scale: 0.8, opacity: 0, rotate: -10 }, animate: { scale: 1, opacity: 1, rotate: 0 }, exit: { scale: 0.9, opacity: 0, rotate: 10 } },
  heartbeat: { initial: { scale: 0.9, opacity: 0 }, animate: { scale: [0.9, 1.03, 1], opacity: 1 }, exit: { scale: 0.95, opacity: 0 } },
};

// Tạo một mảng các key từ đối tượng transitions để truy cập an toàn
const transitionKeys = Object.keys(transitions);

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    })
  );
};

const DISPLAY_DURATION = 5000;
const FINAL_SCROLL_DURATION = 4000;
const TRANSITION_DURATION = 1000;

// Styled components
const MusicContainer = styled(motion.div)(({ theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundImage: `url('/assets/images/wedding/hoahongnhe.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  position: 'fixed',
}));

const MusicContent = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  maxWidth: 500,
  position: 'relative',
}));

const MotionButtonGroup = motion(Stack);

const Slideshow: React.FC<SlideshowProps> = ({ 
  imageUrls: propsImageUrls, 
  initialIndex = 0, 
  onClose,
  brideName = "Cát Hạ",
  groomName = "Giăng Ân", 
  weddingDate = "27/09/2025",
  weddingVenue = "HTTL Hà Nội"
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentPhase, setCurrentPhase] = useState<SlidePhase>('loading');
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentTransition, setCurrentTransition] = useState<TransitionVariant>(transitions.fadeIn);
  
  const intervalRef = useRef<number | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFetchAndPreload = useCallback(async () => {
    try {
      let urls: string[] = [];
      if (propsImageUrls) {
        urls = propsImageUrls;
      } else {
        const response = await fetch(APPS_SCRIPT_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: ApiResponse = await response.json();
        urls = data.urls;
      }
      
      const uniqueUrls = [...new Set([...urls])];
      await preloadImages(uniqueUrls);
      setImageUrls(uniqueUrls);
      setCurrentPhase('musicConsent');
    } catch (err) {
      console.error('Error loading images:', err);
      setCurrentPhase('intro');
    }
  }, [propsImageUrls]);

  useEffect(() => {
    handleFetchAndPreload();
  }, [handleFetchAndPreload]);

  const handleMusicChoice = useCallback((shouldPlay: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setCurrentPhase('intro');
      if (shouldPlay) {
        if (!mainAudioRef.current) {
          mainAudioRef.current = new Audio('/assets/audio/wedding.mp3');
          mainAudioRef.current.loop = true;
          mainAudioRef.current.volume = 1;
        }
        mainAudioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn("Không thể phát nhạc:", err);
        });
      }
    }, TRANSITION_DURATION);
  }, []);

  const handleBannerComplete = useCallback(() => {
    setCurrentPhase('slideshow');
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (currentIndex === imageUrls.length - 1) {
        setCurrentPhase('finalScroll');
        stopInterval();
        setTimeout(() => {
          if (mainAudioRef.current) {
            mainAudioRef.current.pause();
            mainAudioRef.current.currentTime = 0;
            setIsPlaying(false);
          }
          onClose?.();
        }, FINAL_SCROLL_DURATION);
      } else {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
        // Sửa lỗi ở đây: truy cập mảng key an toàn hơn
        const randomTransitionKey = transitionKeys[Math.floor(Math.random() * transitionKeys.length)];
        setCurrentTransition(transitions[randomTransitionKey]);
      }
    }, DISPLAY_DURATION);
  }, [currentIndex, imageUrls.length, onClose]);
  
  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (currentPhase === 'slideshow' && isPlaying && imageUrls.length > 1) {
      startInterval();
    } else {
      stopInterval();
    }
    return stopInterval;
  }, [currentPhase, isPlaying, imageUrls.length, startInterval, stopInterval]);

  useEffect(() => {
    return () => {
      if (mainAudioRef.current) mainAudioRef.current.pause();
    };
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!mainAudioRef.current) return;
    if (isPlaying) {
      mainAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      mainAudioRef.current.play().then(() => setIsPlaying(true))
        .catch(err => console.warn("Không thể phát nhạc:", err));
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    stopInterval();
    setCurrentIndex(prev => (prev + 1) % imageUrls.length);
    // Sửa lỗi ở đây: truy cập mảng key an toàn hơn
    const randomTransitionKey = transitionKeys[Math.floor(Math.random() * transitionKeys.length)];
    setCurrentTransition(transitions[randomTransitionKey]);
    if (isPlaying) startInterval();
  }, [imageUrls.length, isPlaying, startInterval, stopInterval]);

  const handlePrevious = useCallback(() => {
    stopInterval();
    setCurrentIndex(prev => (prev - 1 + imageUrls.length) % imageUrls.length);
    // Sửa lỗi ở đây: truy cập mảng key an toàn hơn
    const randomTransitionKey = transitionKeys[Math.floor(Math.random() * transitionKeys.length)];
    setCurrentTransition(transitions[randomTransitionKey]);
    if (isPlaying) startInterval();
  }, [imageUrls.length, isPlaying, startInterval, stopInterval]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: currentPhase === 'slideshow' || currentPhase === 'finalScroll' ? 
          'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #fad0c4 50%, #ffd1ff 100%)' : 
          '#000',
        zIndex: 1500,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {currentPhase === 'loading' && (
          <Box sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#000',
            zIndex: 1600
          }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>Đang tải album...</Typography>
          </Box>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPhase === 'musicConsent' && (
          <MusicContainer
            key="music-consent-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            <MusicContent>
              <Typography variant="h4" sx={{
                color: '#928362',
                fontFamily: "'Oooh Baby', serif",
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 500,
                mb: 2,
                letterSpacing: '0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}>
                Thêm chút nhạc?
              </Typography>
              <Typography sx={{
                color: '#000',
                fontSize: { xs: '1rem', sm: '1rem' },
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                mb: 4,
                letterSpacing: '0.03em',
              }}>
                Một bản nhạc đặc biệt cho khoảnh khắc đặc biệt
              </Typography>
              <MotionButtonGroup direction="row"
                spacing={2}
                justifyContent="center"
                animate={isTransitioning ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}>
                <Button onClick={() => handleMusicChoice(false)} disabled={isTransitioning}
                  sx={{
                    color: '#000',
                    fontFamily: "'Oooh Baby', serif",
                    fontSize: { xs: '1.5rem', sm: '1.5rem' },
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Không
                </Button>
                <Button sx={{
                  color: '#000',
                  fontFamily: "'Oooh Baby', serif",
                  fontSize: { xs: '1.5rem', sm: '1.5rem' },
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }} onClick={() => handleMusicChoice(true)} disabled={isTransitioning}>
                  Có
                </Button>
              </MotionButtonGroup>
            </MusicContent>
          </MusicContainer>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION / 1000, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'black',
              zIndex: 1400,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPhase === 'intro' && (
          <motion.div key="intro" style={{ width: '100%', height: '100%' }}>
            <WeddingBanner
              image={MAIN_WEDDING_IMAGE}
              brideName={brideName}
              groomName={groomName}
              weddingDate={weddingDate}
              weddingVenue={weddingVenue}
              isMobile={isMobile}
              isVisible={true}
              onComplete={handleBannerComplete}
            />
          </motion.div>
        )}

        {(currentPhase === 'slideshow' || currentPhase === 'finalScroll') && (
          <motion.div key="slideshow" {...transitions.fadeIn} style={{ width: '100%', height: '100%' }}>
            <PhotoBoothLayout
              imageUrls={imageUrls}
              currentPhase={currentPhase}
              currentIndex={currentIndex}
              currentTransition={currentTransition}
            />

            {currentPhase === 'slideshow' && (
              <>
                {!isMobile && (
                  <>
                    <IconButton onClick={handlePrevious} sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.7)', bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', '&:hover': { bgcolor: 'rgba(255,182,193,0.9)', color: 'white', transform: 'translateY(-50%) scale(1.1)' }, transition: 'all 0.3s ease', zIndex: 1501 }}>
                      <ArrowBackIosNewIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.7)', bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', '&:hover': { bgcolor: 'rgba(255,182,193,0.9)', color: 'white', transform: 'translateY(-50%) scale(1.1)' }, transition: 'all 0.3s ease', zIndex: 1501 }}>
                      <ArrowForwardIosIcon fontSize="large" />
                    </IconButton>
                  </>
                )}

                <Stack
                  direction="row"
                  spacing={isMobile ? 1 : 2}
                  sx={{
                    position: 'absolute',
                    bottom: isMobile ? 16 : 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '50px',
                    p: isMobile ? 1 : 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 1501,
                    maxWidth: isMobile ? '90%' : 'auto',
                  }}
                >
                  {isMobile && (
                    <IconButton onClick={handlePrevious} size="small" sx={{ color: '#ff69b4', '&:hover': { bgcolor: 'rgba(255, 182, 193, 0.2)' } }}>
                      <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                  )}
                  <Tooltip title={isPlaying ? 'Tạm dừng slideshow' : 'Bắt đầu slideshow'}>
                    <IconButton onClick={handlePlayPause} size={isMobile ? "small" : "medium"} sx={{ color: '#ff69b4', '&:hover': { bgcolor: 'rgba(255, 182, 193, 0.2)', transform: 'scale(1.1)' } }}>
                      {isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                    </IconButton>
                  </Tooltip>
                  {isMobile && (
                    <IconButton onClick={handleNext} size="small" sx={{ color: '#ff69b4', '&:hover': { bgcolor: 'rgba(255, 182, 193, 0.2)' } }}>
                      <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                  )}
                  {!isMobile && <Box sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', height: 40 }} />}
                  <Tooltip title={`Ảnh ${currentIndex + 1}/${imageUrls.length}`}>
                    <Box sx={{ display: 'flex', alignItems: 'center', px: isMobile ? 1 : 2 }}>
                      <FavoriteIcon sx={{ color: '#ff69b4', fontSize: isMobile ? '0.9rem' : '1rem', mr: 0.5 }} />
                      <Typography variant="caption" sx={{ color: '#333', fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                        {currentIndex + 1}/{imageUrls.length}
                      </Typography>
                    </Box>
                  </Tooltip>
                  {onClose && (
                    <>
                      {!isMobile && <Box sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', height: 40 }} />}
                      <Tooltip title="Đóng slideshow">
                        <IconButton onClick={onClose} size={isMobile ? "small" : "medium"} sx={{ color: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(255, 99, 99, 0.2)', color: '#ff6363', transform: 'scale(1.1)' } }}>
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Slideshow;