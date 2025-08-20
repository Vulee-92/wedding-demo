/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import { weddingData } from './weddingData';

const giftColors = {
  primary: '#928362',
  secondary: '#D2B48C',
  accent: '#F5F5DC',
  text: '#4A4A4A',
  bg: '#FDFBF7',
};

// Change `styled('section')` to `styled(motion.section)`
const RootStyle = styled(motion.section)(({ theme }: any) => ({
  backgroundImage: 'url("https://res.cloudinary.com/difiyurn7/image/upload/v1754986206/ChatGPT_Image_15_09_58_12_thg_8_2025_jjdwwo.png")',
  backgroundSize: 'cover',
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
  },
}));

const Card = styled(motion.div)(({ theme }: any) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2),
  border: `1px solid ${alpha(giftColors.secondary, 0.3)}`,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
  },
}));

const FlexBox = styled(Grid)(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: "nowrap",
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const QRWrapper = styled(Box)(({ theme }: any) => ({
  flexShrink: 0,
  width: '100%',
  maxWidth: 200,
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const QRImage = styled('img')({
  width: '70%',
  height: 'auto',
  borderRadius: '8px',
});

const AccountDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: "center",
  flexGrow: 1,
});

const RoleTitle = styled(Typography)(({ theme }: any) => ({
  fontFamily: "'Playfair Display', serif",
  fontWeight: 500,
  fontSize: '1rem',
  color: giftColors.primary,
  marginBottom: theme.spacing(0.5),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    display: 'block',
    width: '60%',
    height: '2px',
    backgroundColor: giftColors.secondary,
    margin: '4px auto 0',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
    },
  },
}));

const OwnerName = styled(Typography)({
  fontFamily: "'Playfair Display', serif",
  fontSize: '0.7rem',
  color: giftColors.text,
  fontWeight: 500,
  marginTop: '8px',
});

const AccountDetailsText = styled(Typography)({
  fontFamily: "'Playfair Display', serif",
  fontSize: '0.5rem',
  color: giftColors.text,
  fontWeight: 400,
});

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 1, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MainTitle = styled(motion.div)(({ theme }: any) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '450px',
  margin: '0 auto',
  '& .title-handwriting': {
    fontFamily: "'Oooh Baby', cursive",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: "#928362",
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

const thankYouStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.8, delayChildren: 0.5 },
  },
};

const thankYouItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
};

export function WeddingGiftSection() {
  const thankYouText = [
    "Chúng tôi chân thành cảm ơn sự hiện diện",
    "và lời chúc phúc của quý vị.",
    "Nguyện xin Chúa ban ơn",
    "và niềm vui dư dật trên mỗi người."
  ];

  return (
    // Apply animation props directly to RootStyle
    <RootStyle
      id="wedding-gift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container maxWidth="md">
        <MainTitle
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        >
          <Typography className="title-handwriting">
            Gửi Trao Yêu Thương
          </Typography>
          {/* Ghi chú thêm cho khách mời */}
          <Typography className="title-sans">
       Xin chân thành cảm ơn.💖
          </Typography>
          <Box sx={{ width: '100%', mt: 4 }} />
        </MainTitle>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {/* Thẻ quà tặng của chú rể */}
            <Grid item xs={12} md={6}>
              <Card variants={itemVariants}>
                <FlexBox container>
                  <Grid item xs={12} sm={4}>
                    <QRWrapper>
                      <QRImage src="https://res.cloudinary.com/dxfsa7foy/image/upload/v1755251465/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-15_lu%CC%81c_16.49.38-Photoroom_xvdtci.png" alt="Mã QR Chú Rể" />
                    </QRWrapper>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <AccountDetails>
                      <RoleTitle>CHÚ RỂ</RoleTitle>
                      <OwnerName>{weddingData.banksGroom.owner}</OwnerName>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                        <AccountDetailsText sx={{ mr: 1 }}>
                          {weddingData.banksGroom.bank} - {weddingData.banksGroom.account}
                        </AccountDetailsText>
                      </Box>
                      {/* Ghi chú lịch sự và rõ ràng */}
                      <Typography sx={{ fontSize: '0.6rem', color: '#666', fontStyle: 'italic', marginTop: '4px' }}>
                        (Em gái chú rể nhận thay)
                      </Typography>
                    </AccountDetails>
                  </Grid>
                </FlexBox>
              </Card>
            </Grid>

            {/* Thẻ quà tặng của cô dâu */}
            <Grid item xs={12} md={6}>
              <Card variants={itemVariants}>
                <FlexBox container>
                  <Grid item xs={12} sm={4}>
                    <QRWrapper>
                      <QRImage src="https://res.cloudinary.com/dxfsa7foy/image/upload/v1755250931/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-15_lu%CC%81c_16.41.47-Photoroom_kfr99k.png" alt="Mã QR Cô Dâu" />
                    </QRWrapper>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <AccountDetails>
                      <RoleTitle>CÔ DÂU</RoleTitle>
                      <OwnerName>{weddingData.bankbride.owner}</OwnerName>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                        <AccountDetailsText sx={{ mr: 1 }}>
                          {weddingData.bankbride.bank} - {weddingData.bankbride.account}
                        </AccountDetailsText>
                      </Box>
                      {/* Ghi chú lịch sự và rõ ràng */}
                      <Typography sx={{ fontSize: '0.6rem', color: '#666', fontStyle: 'italic', marginTop: '4px' }}>
                        (Bố của cô dâu nhận thay)
                      </Typography>
                    </AccountDetails>
                  </Grid>
                </FlexBox>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Phần cảm ơn đã được chỉnh sửa */}
        <MainTitle
          initial="hidden"
          whileInView="visible"
          variants={thankYouStagger}
          viewport={{ once: true, amount: 0.3 }}
          sx={{ pt: 5 }}
        >
          {thankYouText.map((line, index) => (
            <motion.div key={index} variants={thankYouItem}>
              <Typography className="title-sans" sx={{ fontSize: "14px !important" }}>
                {line}
              </Typography>
            </motion.div>
          ))}
        </MainTitle>
      </Container>
    </RootStyle>
  );
}