/* eslint-disable */
import { useRef, useState, useEffect } from 'react';
import { Typography, Button, Stack, Container, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingLayout } from './layout';
import { CoverSection } from './cover';
import { WelcomeSection } from './welcome';
import { GallerySection } from './gallery';
import { ContactSection } from './contact';
import { LoadingGallery } from './loading-gallery';
import { weddingData } from './weddingData';
import { CountdownSection } from './countdown';
import { EventDetailsSection } from './event-details';
import { RsvpSection } from './rsvp';
import { MusicPlayer } from './music-player';
import { RestaurantInfoSection } from './restaurant';
import { WeddingGiftSection } from './back';
import { BibleSection } from './bible';
import { EventSection } from './dayevent';



const MusicContainer = styled(motion.div)(() => ({
  top: 0,
  left: 0,
  height: '100vh',
  backgroundImage: `url('/assets/images/wedding/hoahongnhe.png')`,
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));

const MusicContent = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  maxWidth: 500,
  position: 'relative',
}));

const MusicButtonGroup = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiButton-root': {
    minWidth: 120,
    padding: theme.spacing(1.2, 4),
    borderRadius: 30,
    fontSize: '1rem',
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    textTransform: 'none',
  },
  '& .MuiButton-contained': {
    background: '#ffffff',
    color: '#000000',
    '&:hover': {
      background: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(255,255,255,0.2)',
    },
  },
  '& .MuiButton-outlined': {
    borderColor: '#ffffff',
    color: '#ffffff',
    '&:hover': {
      borderColor: '#ffffff',
      background: 'rgba(255,255,255,0.1)',
      transform: 'translateY(-2px)',
    },
  },
}));

// Add a motion wrapper for the button group
const MotionButtonGroup = motion(MusicButtonGroup);

export default function WeddingView() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showMusicDialog, setShowMusicDialog] = useState(true); // Luôn hiển thị dialog đầu tiên
  const [isLoading, setIsLoading] = useState(false); // Chưa ở trạng thái loading ban đầu
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isViewingIntroAgain, setIsViewingIntroAgain] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  
useEffect(() => {
  const audio = new Audio('./assets/audio/song.mp3');
  audio.preload = 'auto'; // Preload file
  audio.volume = 1;
  audio.loop = true;
  audioRef.current = audio;

  // Gọi load để browser tải file về sẵn
  audio.load();

  const hasSeenBefore = localStorage.getItem('hasSeenWeddingIntro');
  setHasSeenIntro(hasSeenBefore === 'true');
}, []);

// Chỉnh lại handleMusicChoice để play ngay
const handleMusicChoice = async (choice: boolean) => {
  setIsPlaying(choice);
  setIsTransitioning(true);

  if (choice && audioRef.current) {
    try {
      await audioRef.current.play(); // Play ngay khi click
    } catch (err) {
      console.warn('Không thể phát nhạc ngay:', err);
    }
  }

  // Chuyển sang loading
  setTimeout(() => {
    setShowMusicDialog(false);
    setIsLoading(true);
  }, 0);
};
  const handleLoadingComplete = () => {
    if (!isViewingIntroAgain) {
      localStorage.setItem('hasSeenWeddingIntro', 'true');
    }
    setIsLoading(false);
    setIntroCompleted(true);
    setIsViewingIntroAgain(false);
  };

  const handleSkipIntro = () => {
    // Logic này sẽ được gọi từ LoadingGallery nếu cần
    handleLoadingComplete();
  };

  // Function to reset intro state and show loading screen again
  const handleViewIntroAgain = () => {
    setIsViewingIntroAgain(true);

    // Reset tất cả các state để hiển thị lại dialog nhạc
    setShowMusicDialog(true);
    setIsLoading(false);
    setIntroCompleted(false);
    setIsTransitioning(false);
    setHasSeenIntro(false);

    // Reset audio state
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
    }
    setIsPlaying(false);
  };


  // useScrollControl(sections);

  // Chỉ render một trong ba trạng thái: dialog nhạc, loading hoặc nội dung chính
  // if (showMusicDialog) {
  //   return (
  //    <Box
  //     sx={{
  //       width: '100vw',
  //       maxWidth: {
  //         xs: '100vw',
  //         sm: '100vw',
  //         md: '600px'
  //       },
  //       height: '100vh',
  //       margin: '0 auto',
  //       overflowX: 'hidden',
  //     }}
  //   >

  //       <MusicContainer
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: isTransitioning ? 0 : 1 }}
  //         transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
  //       >
  //         <MusicContent
  //           initial={{ opacity: 1, scale: 1 }}
  //           animate={isTransitioning ? { opacity: 0, scale: 1.2 } : { opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
  //         >
  //           <motion.div
  //             initial={false}
  //             animate={isTransitioning ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
  //             transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  //           >
  //             <Typography
  //               variant="h4"
  //               sx={{
  //                 color: '#928362',
  //                 fontFamily: "'Oooh Baby', serif",
  //                 fontSize: { xs: '2rem', sm: '2.5rem' },
  //                 fontWeight: 500,
  //                 mb: 2,
  //                 letterSpacing: '0.02em',
  //                 textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  //               }}
  //             >
  //               Thêm chút nhạc?
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 color: '#000',
  //                 fontSize: { xs: '1rem', sm: '1rem' },
  //                 fontFamily: "'Cormorant Garamond', serif",
  //                 fontStyle: 'italic',
  //                 mb: 4,
  //                 letterSpacing: '0.03em',
  //               }}
  //             >
  //               Một bản nhạc đặc biệt cho khoảnh khắc đặc biệt
  //             </Typography>
  //             <MotionButtonGroup
  //               direction="row"
  //               spacing={2}
  //               justifyContent="center"
  //               animate={isTransitioning ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
  //               transition={{ duration: 0.4, delay: 0.1 }}
  //             >
  //               <Button
  //                 sx={{
  //                   color: '#000',
  //                   fontFamily: "'Oooh Baby', serif",
  //                   fontSize: { xs: '2rem', sm: '2.5rem' },
  //                   fontWeight: 400,
  //                   mb: 2,
  //                   letterSpacing: '0.02em',
  //                   textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  //                 }}
  //                 onClick={() => handleMusicChoice(false)}
  //                 disabled={isTransitioning}
  //               >
  //                 Không
  //               </Button>
  //               <Button
  //                 sx={{
  //                   color: '#000',
  //                   fontFamily: "'Oooh Baby', serif",
  //                   fontSize: { xs: '2rem', sm: '2.5rem' },
  //                   fontWeight: 400,
  //                   mb: 2,
  //                   letterSpacing: '0.02em',
  //                   textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  //                 }}
  //                 onClick={() => handleMusicChoice(true)}
  //                 disabled={isTransitioning}
  //               >
  //                 Có
  //               </Button>

  //             </MotionButtonGroup>
  //           </motion.div>
  //         </MusicContent>
  //       </MusicContainer>
  //     </Box>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //    <Box
  //     sx={{
  //       width: '100vw',
  //       maxWidth: {
  //         xs: '100vw',
  //         sm: '100vw',
  //         md: '600px'
  //       },
  //       height: '100vh',
  //       margin: '0 auto',
  //       overflowX: 'hidden',
  //     }}
  //   >
  //     <LoadingGallery
  //       images={weddingData.images.albumPhotos}
  //       galleryImages={weddingData.images.albumPhotos}
  //       onLoadingComplete={handleLoadingComplete}
  //       audioRef={audioRef}
  //       isPlaying={isPlaying}
  //       setIsPlaying={setIsPlaying}
  //       hasSeenIntro={hasSeenIntro}
  //       onSkipIntro={handleSkipIntro}
  //     />
  //     </Box>
  //   );
  // }

  // Show main content only when loading is complete
  return (
    <Box
      sx={{
        maxWidth: '600px', // Giới hạn độ rộng tối đa, ví dụ: 500px cho mobile
        margin: '0 auto',
        overflowX: 'hidden',
        
      }}
    >
      <WeddingLayout onViewIntroAgain={handleViewIntroAgain}>
        <CoverSection />
        <BibleSection />
        {/* <EventSection /> */}
        <WelcomeSection detailsRef={detailsRef} />
        <CountdownSection />
        <EventDetailsSection />
        <GallerySection />
        <RsvpSection />
        <WeddingGiftSection />
        {/* <ContactSection /> */}
        {/* <RestaurantInfoSection /> */}
        <MusicPlayer
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </WeddingLayout>
    </Box>

  );
} 
