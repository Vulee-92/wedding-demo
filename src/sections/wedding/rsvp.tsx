/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Heart, User, MessageCircle, Send, CheckCircle, XCircle } from 'lucide-react';

// Dữ liệu và cấu hình giả định để làm cho component hoạt động độc lập
const weddingStyles = {
  colors: {
    primary: '#928362', // Vàng đồng
    secondary: '#D2B48C', // Nâu vàng
    accent: '#F5F5DC', // Be nhạt
    text: '#928362', // Nâu đậm
    bg: '#FDFBF7', // Nền kem
  },
  typography: {
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.2rem',
    },
    body1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '1rem',
    },
  },
  components: {
    section: (theme: any) => ({
      // Đảm bảo không bị giật scroll trên di động
      // height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(8, 0),
      backgroundColor: weddingStyles.colors.bg,
    }),
  },
};

// Styled components
const RootStyle = styled('div')(({ theme }: any) => ({
  ...weddingStyles.components.section(theme),
  backgroundImage: `url('https://res.cloudinary.com/difiyurn7/image/upload/v1754993106/hoanhennhang_mpqh7i.png')`,
  backgroundSize: 'cover',
  position: 'relative',
  '&::before': {
    content: '""',
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}));

const InvitationCard = styled(motion.div)(({ theme }: any) => ({
  width: '100%',
  maxWidth: 600,
  position: 'relative',
  boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
  padding: theme.spacing(4, 3),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(weddingStyles.colors.secondary, 0.5)}`,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 4),
  },
}));

const StyledTextField = styled(TextField)(({ theme }: any) => ({
  fontFamily: "'Playfair Display', serif",

  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: alpha(weddingStyles.colors.bg, 0.4),
    '& fieldset': {
      borderColor: alpha(weddingStyles.colors.secondary, 0.5),
    },
    '&:hover fieldset': {
      borderColor: weddingStyles.colors.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: weddingStyles.colors.primary,
    },
  },
  '& .MuiInputLabel-root': {
    ...weddingStyles.typography.body1,
    color: weddingStyles.colors.text,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }: any) => ({
  fontFamily: "'Playfair Display', serif",
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: alpha(weddingStyles.colors.bg, 0.4),
    '& fieldset': {
      borderColor: alpha(weddingStyles.colors.secondary, 0.5),
    },
    '&:hover fieldset': {
      borderColor: weddingStyles.colors.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: weddingStyles.colors.primary,
    },
  },
  '& .MuiInputLabel-root': {
    ...weddingStyles.typography.body1,
    color: weddingStyles.colors.text,
  },
}));

const ResponseButton = styled(Button)(({ theme }: any) => ({
  width: '100%',
  padding: theme.spacing(1.2, 2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  border: `1px solid ${alpha(weddingStyles.colors.secondary, 0.5)}`,
  fontSize: '0.9rem',
  textTransform: 'none',
  fontFamily: "'Playfair Display', serif",
  color: weddingStyles.colors.text,
  '&.selected': {
    backgroundColor: weddingStyles.colors.primary,
    color: '#fff',
    border: `1px solid ${weddingStyles.colors.primary}`,
    '&:hover': {
      backgroundColor: alpha(weddingStyles.colors.primary, 0.9),
    },
  },
  '&:hover': {
    backgroundColor: alpha(weddingStyles.colors.secondary, 0.3),
  },
}));

const SubmitButton = styled(Button)(({ theme }: any) => ({
  fontFamily: "'Playfair Display', serif",

  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.2, 3),
  fontSize: '0.9rem',
  textTransform: 'none',
  color: '#fff',
  background: `linear-gradient(45deg, ${weddingStyles.colors.primary}, ${weddingStyles.colors.secondary})`,
  boxShadow: `0 8px 16px ${alpha(weddingStyles.colors.primary, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 20px ${alpha(weddingStyles.colors.primary, 0.4)}`,
  },
  '&.Mui-disabled': {
    background: theme.palette.grey[400],
    color: theme.palette.grey[600],
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
}));

const textInputVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const MainTitle = styled(motion.div)(({ theme }: any) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '450px',
  margin: '0 auto',
  '& .title-handwriting': {
    fontFamily: "'Oooh Baby', cursive",
          fontSize: 'clamp(2rem, 5vw, 3rem)',

    color: weddingStyles.colors.primary,
    fontWeight: 400,
  },
  '& .title-sans': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: '#333',
    fontWeight: 300,
    marginTop: theme.spacing(1),
  },
}));

const ConfirmationContent = styled(motion.div)(({ theme }: any) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  color: weddingStyles.colors.text,
}));

const BrideAndGroomImage = styled('img')({
  width: '100%',
  maxWidth: '250px',
  borderRadius: '50%',
  objectFit: 'cover',
  aspectRatio: '1 / 1',
  marginBottom: '20px',
  border: `4px solid ${alpha(weddingStyles.colors.primary, 0.5)}`,
});

export function RsvpSection() {
  const [name, setName] = useState('');
  const [invitedBy, setInvitedBy] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guests, setGuests] = useState('1');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // --- THAY THẾ 'YOUR_WEB_APP_URL_HERE' BẰNG URL BẠN ĐÃ SAO CHÉP TỪ APPS SCRIPT ---
  const GOOGLE_SHEETS_WEB_APP_URL = ""; // Thay thế bằng URL thực tế của bạn
  
  useEffect(() => {
    // Tự động reset form sau 5 giây nếu đã gửi thành công
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        // Reset state để chuẩn bị cho lần nhập mới
        setName('');
        setInvitedBy('');
        setAttending(null);
        setGuests('1');
        setNote('');
      }, 7000); // 5000ms = 5 giây
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = async () => {
    if (!name || !invitedBy || attending === null) {
      setSnackbar({ open: true, message: 'Vui lòng điền đầy đủ thông tin bắt buộc', severity: 'error' });
      return;
    }

    setLoading(true);

    const formData = {
      formType: 'rsvp',
      name,
      invitedBy,
      guests,
      attending,
      note,
    };

    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      
    } catch (error) {
      console.error('RSVP Error:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra, vui lòng thử lại sau.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (response: any) => {
    setAttending(response);
    if (response === 'no') {
      setGuests('1');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const renderConfirmation = () => {
    return (
      <InvitationCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ConfirmationContent>
          <BrideAndGroomImage src="https://res.cloudinary.com/dxfsa7foy/image/upload/v1755237582/IMG_5460_11zon_xvitq3.jpg" alt="Bride and Groom" />
          {attending === 'yes' ? (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              </motion.div>
              <Typography
                variant="h4"
                sx={{ mt: 2, fontFamily: "'Playfair Display', serif", fontWeight: 600, color: weddingStyles.colors.primary }}
              >
                Cảm ơn {name}!
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, fontFamily: "'Playfair Display', serif", color: '#333' }}
              >
                Phản hồi của bạn đã được ghi nhận. Vợ chồng mình rất vui vì bạn sẽ có mặt. Hẹn gặp bạn vào ngày trọng đại của chúng mình nhé!
              </Typography>
            </>
          ) : (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              </motion.div>
              <Typography
                variant="h4"
                sx={{ mt: 2, fontFamily: "'Playfair Display', serif", fontWeight: 600, color: weddingStyles.colors.primary }}
              >
                Thật tiếc, {name} ơi!
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, fontFamily: "'Playfair Display', serif", color: '#333' }}
              >
                Chúng mình đã nhận được phản hồi của bạn. Dù không thể có mặt, cảm ơn bạn đã dành thời gian thông báo. Mong chúng ta sẽ có dịp gặp lại sớm nhất!
              </Typography>
            </>
          )}
        </ConfirmationContent>
      </InvitationCard>
    );
  };

  const renderForm = () => (
    <InvitationCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <motion.div variants={textInputVariants}>
          <StyledTextField
            fullWidth
            size="small"
            label="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, color: weddingStyles.colors.text }}>
                  <User size={18} />
                </Box>
              ),
            }}
          />
        </motion.div>
        <motion.div variants={textInputVariants} transition={{ delay: 0.1 }}>
          <StyledFormControl fullWidth size="small">
            <InputLabel>Bạn là khách của ai?</InputLabel>
            <Select
              value={invitedBy}
              onChange={(e) => setInvitedBy(e.target.value)}
              label="Bạn là khách của ai?"
            >
              <MenuItem value="bride">Bạn của Cô Dâu</MenuItem>
              <MenuItem value="groom">Bạn của Chú Rể</MenuItem>
            </Select>
          </StyledFormControl>
        </motion.div>

        <AnimatePresence>
          {attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StyledFormControl fullWidth size="small">
                <InputLabel>Bạn tham dự cùng với ai?</InputLabel>
                <Select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  label="Bạn tham dự cùng với ai?"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} người
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={textInputVariants} transition={{ delay: 0.2 }}>
          <StyledTextField
            fullWidth
            size="small"
            label="Gửi lời nhắn đến cô dâu chú rể"
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, color: weddingStyles.colors.text }}>
                  <MessageCircle size={18} />
                </Box>
              ),
            }}
          />
        </motion.div>
      </Box>
      <Box sx={{ mb: 2 }}>
        <motion.div variants={textInputVariants} transition={{ delay: 0.3 }}>
          <Typography sx={{ mb: 1, textAlign: 'center', color: weddingStyles.colors.text, ...weddingStyles.typography.body1 }}>
            Bạn có thể tham dự được không?
          </Typography>
          <ResponseButton
            className={attending === 'yes' ? 'selected' : ''}
            onClick={() => handleAttendanceChange('yes')}
          >
            <Heart size={18} style={{ marginRight: '8px' }} />
            Có, tôi sẽ đến
          </ResponseButton>
          <ResponseButton
            className={attending === 'no' ? 'selected' : ''}
            onClick={() => handleAttendanceChange('no')}
          >
            <Heart size={18} style={{ marginRight: '8px' }} />
            Không, rất tiếc
          </ResponseButton>
        </motion.div>
      </Box>

      <motion.div variants={textInputVariants} transition={{ delay: 0.4 }}>
        <SubmitButton
          variant="contained"
          fullWidth
          disabled={loading || !name || !invitedBy || attending === null}
          onClick={handleSubmit}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Send size={18} />}
        >
          {loading ? 'Đang gửi...' : 'Gửi Phản Hồi'}
        </SubmitButton>
      </motion.div>
    </InvitationCard>
  );

  return (
    <RootStyle id="rsvp">
      <Container maxWidth="sm">
        <MainTitle
          initial={{ opacity: 1, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <Typography className="title-handwriting">
            Xác Nhận Tham Dự
          </Typography>
          <Typography className="title-sans">
            {/* Chúng tôi chân thành cảm ơn sự hiện diện và lời chúc phúc của quý vị.<br />Nguyện xin Chúa ban ơn và niềm vui dư dật trên mỗi người. */}
           Sự hiện diện của bạn là <br /> món quà ý nghĩa nhất cho chúng tôi!
          </Typography>
          <Box sx={{ width: '100%', mt: 4 }} />
        </MainTitle>
        <AnimatePresence mode="wait">
          {isSubmitted ? renderConfirmation() : renderForm()}
          
        </AnimatePresence>
         <MainTitle
          initial={{ opacity: 1, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
        >

           <Typography className="title-sans">
           Vui lòng xác nhận trước ngày 20/10/2025
          </Typography>
        </MainTitle>
       
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? green[600] : red[600],
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </RootStyle>
  );
}
