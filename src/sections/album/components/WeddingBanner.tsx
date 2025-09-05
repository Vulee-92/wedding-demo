// src/sections/album/components/WeddingBanner.tsx
import { motion, useAnimation } from 'framer-motion';
import { Box, Typography, Stack } from '@mui/material';
import { useEffect } from 'react';

interface WeddingBannerProps {
  image: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingVenue: string;
  isMobile: boolean;
  isVisible: boolean;
  onComplete: () => void;
}

const WeddingBanner: React.FC<WeddingBannerProps> = ({
  image,
  brideName,
  groomName,
  weddingDate,
  weddingVenue,
  isMobile,
  isVisible,
  onComplete,
}) => {
  const controls = useAnimation();
  const bannerDisplayDuration = 9000; // Kéo dài thời gian hiển thị banner lên 6 giây

  useEffect(() => {
    if (isVisible) {
      // Animation khi banner xuất hiện
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: 'easeInOut' },
      });

      // Bắt đầu animation exit sau khi hiển thị đủ thời gian
      const timer = setTimeout(() => {
        controls.start({
          opacity: 0,
          scale: 0.9, // Thu nhỏ nhẹ khi biến mất
          transition: { duration: 1, ease: 'easeInOut' },
        }).then(() => {
          onComplete(); // Gọi onComplete sau khi animation exit hoàn tất
        });
      }, bannerDisplayDuration); // Thời gian hiển thị banner

      return () => clearTimeout(timer);
    } else {
      // Đảm bảo banner ẩn nếu isVisible là false
      controls.start({ opacity: 0, scale: 0.8 });
    }
  }, [isVisible, controls, onComplete, bannerDisplayDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }} // Bắt đầu từ hơi zoom out và trong suốt
      animate={controls}
      style={{
        position: 'relative', // Quan trọng để ảnh nền phủ đầy
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column', // Đặt nội dung theo cột
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // Màu chữ trắng để nổi bật trên nền ảnh
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6) grayscale(20%)', // Làm mờ và xám nhẹ ảnh nền
          zIndex: -1, // Đặt ảnh nền phía sau
        }}
      />

      {/* Main Text Content */}
      <Stack 
        spacing={isMobile ? 1 : 2} 
        textAlign="center" 
        sx={{ 
          zIndex: 1, // Đảm bảo nội dung chữ nổi lên trên ảnh nền
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)', // Bóng chữ để dễ đọc hơn
          p: isMobile ? 2 : 4,
        }}
      >
        <Typography
          variant={isMobile ? "h3" : "h1"}
          sx={{
                    fontFamily: "'Playfair Display', serif",

            fontWeight: 600,
            color: '#928362', // Màu trắng ngà
            letterSpacing: isMobile ? '2px' : '4px',
            lineHeight: 1.2,
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            style={{ display: 'block' }}
          >
            {groomName.toUpperCase()} &amp; {brideName.toUpperCase()}
          </motion.span>
        </Typography>

        <Typography
          variant={isMobile ? "h3" : "h5"}
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: '#fff',
            letterSpacing: isMobile ? '1px' : '2px',
            mt: 0.5,
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
            style={{ display: 'block' }}
          >
             {weddingVenue}
          </motion.span>
        </Typography>

        <Typography
          variant={isMobile ? "body2" : "h6"}
          sx={{
            fontFamily: "'Montserrat', sans-serif", // Font chữ hiện đại hơn cho chi tiết
            color: '#e0c2bf', // Màu hồng nhạt
            letterSpacing: '0.8px',
            mt: 2,
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
            style={{ display: 'block' }}
          >
            {weddingDate} 
          </motion.span>
        </Typography>

       
      </Stack>
    </motion.div>
  );
};

export default WeddingBanner;