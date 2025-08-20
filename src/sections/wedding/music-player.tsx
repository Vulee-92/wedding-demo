/* eslint-disable */
import { styled } from '@mui/material/styles';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { weddingStyles } from './styles';

const PlayerWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 1000,
}));

const MusicButton = styled(IconButton)(({ theme }) => ({
  background: weddingStyles.colors.primary,
  color: '#fff',
  '&:hover': {
    background: weddingStyles.colors.accent,
    transform: 'scale(1.1) rotate(10deg)',
  },
  width: 48,
  height: 48,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
}));

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export function MusicPlayer({ audioRef, isPlaying, setIsPlaying }: MusicPlayerProps) {

  const fadeVolume = (targetVolume: number, duration: number) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const startTime = Date.now();

    const animateFade = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        audio.volume = startVolume + (targetVolume - startVolume) * progress;
        requestAnimationFrame(animateFade);
      } else {
        audio.volume = targetVolume;
        if (targetVolume === 0) {
          audio.pause();
        }
      }
    };

    requestAnimationFrame(animateFade);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Tạm dừng nhạc ngay lập tức
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Phát nhạc với hiệu ứng fade-in
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          fadeVolume(0.5, 500); // Fade to 50% volume over 500ms
        }).catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <PlayerWrapper>
      <Tooltip title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}>
        <MusicButton
          onClick={togglePlay}
          sx={{
            animation: isPlaying ? 'spin 4s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        >
          <Iconify
            icon={isPlaying ? 'mdi:music-note' : 'mdi:music-note-off'}
            width={24}
          />
        </MusicButton>
      </Tooltip>
    </PlayerWrapper>
  );
}
