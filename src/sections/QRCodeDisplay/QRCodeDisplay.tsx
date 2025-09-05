import React, { useState, useEffect, FC, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Camera, PlayArrow, Pause } from '@mui/icons-material';
import * as Tone from 'tone';
import QRCode from 'qrcode'; // Cập nhật import qrcode

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrC-16fNUNaxc0tmmT0dylGJ7wfCa6goWfeLzYlzItM6HBFpkDqsnSRQ1tHVVw4nzm/exec';

// Icon Components
const CameraIcon: FC = () => <Camera sx={{ color: 'white', fontSize: 30 }} />;

// Styled Components for animations
const AnimatedBox = styled(Box)(({ theme }) => ({
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
    opacity: 0,
    transform: 'scale(1)',
    '&.is-visible': {
        opacity: 1,
        transform: 'scale(1)',
    },
    '&.slide-in-right': {
        transform: 'translateX(100%)',
        '&.is-visible': {
            transform: 'translateX(0)',
        },
    },
    '&.slide-in-left': {
        transform: 'translateX(-100%)',
        '&.is-visible': {
            transform: 'translateX(0)',
        },
    },
}));

// Main Component
const QRCodeDisplay: FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSlideshowMode, setIsSlideshowMode] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [slideshowUrl, setSlideshowUrl] = useState<string | null>(null);
    const [animationClass, setAnimationClass] = useState('fade-in');
    const [isMusicLoaded, setIsMusicLoaded] = useState(false);
    const [player, setPlayer] = useState<Tone.Player | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animationEffects = ['fade-in', 'slide-in-right', 'slide-in-left'];

    // Lấy ảnh từ API
    useEffect(() => {
        const fetchImagesFromApi = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(APPS_SCRIPT_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setImageUrls(data.urls);
            } catch (err) {
                console.error("Lỗi khi tải ảnh từ API:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImagesFromApi();

        // Tạo URL cho QR Code
        const url = window.location.href.split('?')[0] + '?slideshow=true';
        setSlideshowUrl(url);
    }, []);

    // Logic slideshow tự động
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isSlideshowMode && isPlaying && imageUrls.length > 0) {
            interval = setInterval(() => {
                setSelectedIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
                const randomEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
                setAnimationClass(randomEffect);
            }, 3000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isSlideshowMode, isPlaying, imageUrls.length]);

    // Xử lý phát nhạc
    useEffect(() => {
        if (!player) {
            const newPlayer = new Tone.Player('/assets/audio/song.mp3').toDestination();
            setPlayer(newPlayer);
            // newPlayer.loaded.valueOf(() => setIsMusicLoaded(true));
        }

        if (player) {
            if (isPlaying && isMusicLoaded) {
                if (player.state !== 'started') {
                    Tone.start().then(() => {
                        player.start();
                    });
                }
            } else if (!isPlaying && player.state === 'started') {
                player.stop();
            }
        }
    }, [isPlaying, isMusicLoaded, player]);

    // Xử lý khi người dùng vào trang bằng QR Code
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const autoPlay = urlParams.get('slideshow');
        if (autoPlay === 'true' && imageUrls.length > 0) {
            setIsSlideshowMode(true);
            setSelectedIndex(0);
            setIsPlaying(true);
        }
    }, [imageUrls]);

    // Tạo mã QR và render vào canvas
    useEffect(() => {
        if (canvasRef.current && slideshowUrl) {
            QRCode.toCanvas(canvasRef.current, slideshowUrl, (error: any) => {
                if (error) console.error(error);
            });
        }
    }, [slideshowUrl]);

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleStartSlideshow = () => {
        setIsSlideshowMode(true);
        setSelectedIndex(0);
        setIsPlaying(true);
    };

    const handleBackToQR = () => {
        setIsSlideshowMode(false);
        setIsPlaying(false);
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Đang tải album...</Box>;
    }

    if (isSlideshowMode) {
        return (
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                bgcolor: 'black',
                overflow: 'hidden',
            }}>
                <AnimatedBox
                    className={`is-visible ${animationClass}`}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${imageUrls[selectedIndex]})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                    }}
                />
                 {/* Các nút điều khiển */}
                <Box sx={{ position: 'absolute', bottom: 30, zIndex: 2, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleBackToQR}
                        sx={{ borderRadius: '999px', p: 2, minWidth: 0 }}
                    >
                        <CameraIcon />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handlePlayPause}
                        sx={{ borderRadius: '999px', p: 2, minWidth: 0 }}
                    >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </Button>
                </Box>
            </Box>
        );
    }

    // Giao diện chính của QR code
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'black',
                color: 'white',
                p: 3,
                textAlign: 'center',
                fontFamily: '"Inter", sans-serif',
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold', mb: 1, letterSpacing: '1px' }}
                >
                    Chào Mừng Đến Với Đám Cưới Của Chúng Tôi!
                </Typography>
                <Typography variant="h5" sx={{ fontStyle: 'italic', mb: 2, opacity: 0.8 }}>
                    Hãy cùng chia sẻ những khoảnh khắc hạnh phúc
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
                    Mời bạn quét mã QR dưới đây để cùng xem những bức ảnh cưới lãng mạn,
                    để những khoảnh khắc này trở nên trọn vẹn và đáng nhớ hơn.
                </Typography>
            </Box>
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)',
                }}
            >
                {slideshowUrl && (
                    <canvas ref={canvasRef} />
                )}
            </Box>
            <Typography variant="caption" sx={{ mt: 2, color: 'grey.500' }}>
                Quét mã để xem trình chiếu tự động
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    onClick={handleStartSlideshow}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        borderRadius: '999px',
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                    }}
                >
                    Xem Album
                </Button>
            </Box>
        </Box>
    );
};

export default QRCodeDisplay;
