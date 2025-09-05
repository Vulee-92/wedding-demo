// components/PhotoAlbum.tsx
import { useState, useEffect, FC } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Slideshow from './Slideshow'; // Import the Slideshow component
import { AudioProvider } from 'src/context/AudioContext';

// You can use a local JSON file or a hardcoded URL for a working example.
// For a real application, replace this with your actual Apps Script URL.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrC-16fNUNaxc0tmmT0dylGJ7wfCa6goWfeLzYlzItM6HBFpkDqsnSRQ1tHVVw4nzm/exec';

// Định nghĩa kiểu dữ liệu cho phản hồi từ API
interface ApiResponse {
  urls: string[];
}

const PhotoAlbum: FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    
    // ✅ New state to manage the slideshow's visibility
    const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);

    const localStorageKey = 'weddingPhotoAlbum';

    const fetchImagesFromApi = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(APPS_SCRIPT_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: ApiResponse = await response.json();
            const newUrls = data.urls;
            setImageUrls(newUrls);
            localStorage.setItem(localStorageKey, JSON.stringify(newUrls));
        } catch (err) {
            console.error("Lỗi khi tải ảnh từ API:", err);
            setError("Không thể tải ảnh. Vui lòng kiểm tra lại URL Apps Script và quyền truy cập.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cachedUrls = localStorage.getItem(localStorageKey);
        if (cachedUrls) {
            setImageUrls(JSON.parse(cachedUrls));
            setIsLoading(false);
        }
        fetchImagesFromApi();
    }, []);

    // ✅ The handleDownload, handleNext, handlePrevious, handlePlayPause functions are no longer needed here
    // as they have been moved to the Slideshow component.

    if (isLoading && imageUrls.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'black', color: 'white' }}>
                <CircularProgress color="primary" />
                <Typography variant="h6" sx={{ mt: 2 }}>Đang tải album...</Typography>
            </Box>
        );
    }

    if (error && imageUrls.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'black' }}>
                <Box sx={{ p: 3, textAlign: 'center', color: 'error.main', bgcolor: 'rgba(255, 179, 179, 0.1)', borderLeft: '4px solid', borderColor: 'error.main', borderRadius: '8px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Lỗi Đã Xảy Ra!</Typography>
                    <Typography sx={{ mt: 1 }}>{error}</Typography>
                </Box>
            </Box>
        );
    }

    if (imageUrls.length === 0 && !isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'black' }}>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>Không có ảnh nào trong album.</Typography>
            </Box>
        );
    }

    return (
        // ✅ Wrap the component with AudioProvider to make audio context available
        <AudioProvider>
            <Box sx={{ bgcolor: 'black', minHeight: '100vh', pt: 2, pb: 10, position: 'relative' }}>
                {message && (
                    <Box sx={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', bgcolor: 'grey.800', color: 'white', py: 1, px: 2, borderRadius: '999px', boxShadow: 3, zIndex: 50 }}>
                        {message}
                    </Box>
                )}

                {/* ✅ Conditionally render the Slideshow component */}
                {isSlideshowOpen && (
                    <Slideshow 
                        imageUrls={imageUrls} 
                        initialIndex={selectedIndex !== null ? selectedIndex : 0}
                        onClose={() => {
                            setIsSlideshowOpen(false);
                            setSelectedIndex(null); // Reset selectedIndex when closing
                        }}
                    />
                )}

                {/* Chế độ xem lưới ảnh */}
                <Box sx={{ p: 1, pt: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<PlayCircleOutlineIcon />}
                            sx={{ mb: 2 }}
                            onClick={() => {
                                if (imageUrls.length > 0) {
                                    setSelectedIndex(0);
                                    setIsSlideshowOpen(true);
                                }
                            }}
                        >
                            Trình chiếu
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            gap: '8px',
                        }}
                    >
                        {imageUrls.map((url, index) => {
                            const isLastRow = index >= Math.floor(imageUrls.length / 4) * 4;
                            const numInLastRow = imageUrls.length % 4;
                            let itemWidth = '24%'; // Default for 4 columns
                            if (isLastRow && numInLastRow > 0) {
                                itemWidth = `${(100 / numInLastRow) - (numInLastRow > 1 ? (8 / numInLastRow) : 0)}%`;
                            }
                            
                            return (
                                <Box
                                    key={index}
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setIsSlideshowOpen(true);
                                    }}
                                    sx={{
                                        width: itemWidth,
                                        flexGrow: 1,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            zIndex: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={url}
                                        alt={`Ảnh cưới ${index + 1}`}
                                        loading="lazy"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </AudioProvider>
    );
};

export default PhotoAlbum;