  /* eslint-disable */

  import { motion, useAnimation } from 'framer-motion';
  import { styled } from '@mui/material/styles';
  import { Box, Container, Typography } from '@mui/material';
  import { weddingStyles } from './styles';
  import { useState, useEffect, RefObject } from 'react';
  import { weddingData } from './weddingData';



  const RootStyle = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundImage: 'url("https://res.cloudinary.com/difiyurn7/image/upload/v1754985415/backgroundlightflower_yyhwy4.png")',
    backgroundSize: 'cover',// Nền trắng ngà ấm hơn
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '80px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: '60px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("https://res.cloudinary.com/difiyurn7/image/upload/v1754986507/hoa_lyfgnc.png")',
      backgroundSize: '400px',
      opacity: 0.05,
      zIndex: 1,
    },
  }));

  const TopCurveTransition = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: -1,
    left: 0,
    width: '100%',
    height: '120px',
    zIndex: 5,
    overflow: 'hidden',
    transform: 'rotate(180deg)',
    '& svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      fill: theme.palette.background.paper,
      filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.02))',
    }
  }));

  const InvitationCard = styled(motion.div)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    maxHeight: '100vh',
    position: 'relative',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '4px',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7, 6), // Tăng padding trên desktop
    },
    [theme.breakpoints.down('sm')]: {
      // padding: theme.spacing(4, 2),
      maxHeight: '98vh',
    },
  }));


  const ParentsInfo = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '10%',
      left: '50%',
      height: '80%',
      width: 1,
      background: 'rgba(0,0,0,0.08)',
    },
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  }));

  const ParentSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
    '& .title': {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
      color: '#000',
      marginBottom: theme.spacing(0.5),
      letterSpacing: '0.03em',
    },
    '& .name': {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.7rem, 1.7vw, 0.95rem)',
      color: '#666',
    },
    '& .location': {
      fontSize: 'clamp(0.65rem, 1.6vw, 0.85rem)',
      color: '#999',
      fontStyle: 'italic',
    },
  }));

  const Announcement = styled(Typography)(({ theme }) => ({
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    color: '#333',
    textAlign: 'center',
    padding: theme.spacing(2, 0),
    borderTop: '1px solid rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    margin: theme.spacing(3, 0),
    '& .pre-title': {
      fontFamily: "'Playfair Display', serif",

      fontSize: 'clamp(0.7rem, 1.7vw, 0.85rem)',
      color: '#928362',
      letterSpacing: '0.1em',
      marginBottom: theme.spacing(0.5),
    },
    '& .main-title': {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
      color: '#333',
      letterSpacing: '0.1em',
      fontWeight: 500,
    },
  }));

  const CoupleNames = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    '& .name': {
      fontFamily: "'Oooh Baby', cursive", // Font chữ mới
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      color: '#928362',
      lineHeight: 1.2,
      marginBottom: theme.spacing(3),
      textShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    '& .role': {
      fontFamily: "'Playfair Display', serif",

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(2),
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(2),
      '& .text': {
      fontFamily: "'Playfair Display', serif",

        fontSize: 'clamp(0.7rem, 1.7vw, 0.9rem)',
        color: '#333',
        fontStyle: 'italic',
      },
      '& .rings': {
        width: 'clamp(16px, 4vw, 20px)',
        opacity: 0.6,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
      },
    },
  }));

  const CeremonyInfo = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    '& .title': {
    fontFamily: "'Playfair Display', serif",


      fontSize: 'clamp(0.7rem, 1.7vw, 0.85rem)',
      color: '#666',
      marginBottom: theme.spacing(0.5),
      letterSpacing: '0.05em',
    },
    '& .location': {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
      color: '#333',
      marginBottom: theme.spacing(0.5),
    },
    '& .address': {
    fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
      color: '#666',
      fontStyle: 'italic',
      marginBottom: theme.spacing(1),
    },
    '& .time': {
    fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
      color: '#666',
    },
  }));

  const DateInfo = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 0),
    borderTop: '1px solid rgba(0,0,0,0.08)',
    '& .main-date': {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
      color: '#333',
      letterSpacing: '0.05em',
      marginBottom: theme.spacing(0.5),
    },
    '& .lunar-date': {
      fontFamily: "'Playfair Display', serif",

      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
      color: '#666',
      fontStyle: 'italic',
    },
  }));





  export function WelcomeSection({ detailsRef }: { detailsRef: RefObject<HTMLDivElement> }) {
    const [showContent, setShowContent] = useState(false);
    const controls = useAnimation();

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if (detailsRef.current && scrollPosition > detailsRef.current.offsetTop) {
        setShowContent(true);
        controls.start('visible');
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <RootStyle ref={detailsRef}>
        <TopCurveTransition>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill='#333'
          >
            <path
              d="M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,122.7C840,107,960,85,1080,90.7C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </TopCurveTransition>

        <Container maxWidth="md">
          <InvitationCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ParentsInfo>
                <ParentSection>
                  <Typography className="title">Ông {weddingData.groom.father}</Typography>
                  <Typography className="title">Bà {weddingData.groom.mother}</Typography>
                  {/* <Typography className="location">Tam Kỳ, Quảng Nam</Typography> */}
                </ParentSection>

                <ParentSection>
                  <Typography className="title">Ông {weddingData.bride.father}</Typography>
                  <Typography className="title">Bà {weddingData.bride.mother}</Typography>
                  {/* <Typography className="location">Thăng Bình, Quảng Nam</Typography> */}
                </ParentSection>
              </ParentsInfo>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Announcement>
                <div className="pre-title">TRÂN TRỌNG BÁO TIN</div>
                <div className="main-title">{weddingData.titleletter}</div>
              </Announcement>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <CoupleNames>
                <Typography className="name">
                  {weddingData.groom.name}
                </Typography>
                <Box className="role">
                  <Typography className="text">{weddingData.groom.role}</Typography>
                  <img src="/assets/images/wedding/ringg.png" alt="rings" className="rings" />
                  <Typography className="text"> {weddingData.bride.role}</Typography>
                </Box>
                <Typography className="name">
                  {weddingData.bride.name}
                </Typography>
              </CoupleNames>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <CeremonyInfo>
                <Typography className="title">HÔN LỄ ĐƯỢC CỬ HÀNH TẠI</Typography>
                <Typography className="location">HỘI THÁNH TIN LÀNH HÀ NỘI</Typography>
                <Typography className="address">(số 2 Ngõ Trạm, Hoàn Kiếm, Hà Nội)</Typography>
                <Typography className="time">VÀO LÚC 09:00 - THỨ BẢY</Typography>
              </CeremonyInfo>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <DateInfo>
                <Typography className="main-date">
                  NGÀY 27 THÁNG 09 NĂM 2025
                </Typography>
                <Typography className="lunar-date">
                  Nhằm ngày 06 tháng 08 năm Ất Tỵ
                </Typography>
              </DateInfo>
            </motion.div>
          </InvitationCard>
        </Container>
      </RootStyle>
    );
  }