import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { weddingData } from './weddingData';

const palePink = '#fdcdddff';

const RootStyle = styled('div')(({ theme }) => ({
    height: '97vh',
    display: 'flex',
    backgroundImage: `url('/assets/images/wedding/hoahongnhe.png')`,
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.1), rgba(255,255,255,1))',
        backdropFilter: 'blur(3px)',
        zIndex: 1,
    },
}));

const InvitationCard = styled(motion.div)(({ theme }) => ({
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(8, 1),
    position: 'relative',
    zIndex: 5,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 6),
    },
}));

const Quote = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontFamily: "'Lora', serif",
  fontSize: '1rem',
  color: '#333',
  letterSpacing: '0.05em',
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  '& .verse': {
    fontFamily: "'Lora', serif",
    marginTop: theme.spacing(1),
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: '#333',
  },
  '& .quote-text': {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'normal',
      fontSize: '0.8rem',
    }
  }
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

const NamesWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
}));

const Names = styled('div')(({ theme }) => ({ // Thay đổi thành div thông thường
    position: 'relative',
    zIndex: 1,
    '& .name': {
        fontFamily: "'Oooh Baby', cursive",
        fontSize: '3rem',
        color: '#333',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0.05em',
        textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
        [theme.breakpoints.down('md')]: {
            fontSize: '3rem',
        },
    },
    '& .divider-decor': {
        position: 'relative',
        height: '40px',
        width: '40px',
        margin: '25px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        '& .line': {
            position: 'absolute',
            width: '1px',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        },
        '& .leaf-icon': {
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: palePink,
            borderRadius: '0 50% 50% 50%',
            transform: 'rotate(45deg)',
            opacity: 0.7,
            '&.top': {
                top: '5px',
            },
            '&.bottom': {
                bottom: '5px',
                transform: 'rotate(-135deg)',
            }
        }
    }
}));

const InvitationWrapper = styled(Box)({
    textAlign: 'center',
    marginTop: '2rem',
});

const InvitationText = styled(Typography)(({ theme }) => ({
    fontFamily: "'Playfair Display', sans-serif",
    fontSize: '0.8rem',
    color: '#333',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    position: 'relative',
    padding: theme.spacing(2, 0),
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.1)',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&::before': { left: 'calc(50% - 100px)' },
    '&::after': { right: 'calc(50% - 100px)' },
}));

const GuestNameWrapper = styled('div')({
    position: 'relative',
    display: 'inline-block',
});

const GuestNameLine = styled('div')({
    color: '#333',
    letterSpacing: '0.4em',
    fontSize: '1rem',
});

const GuestNameOverlay = styled('span')({ // Thay đổi thành span thông thường
    position: 'absolute',
    left: '50%',
    top: '30%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Oooh Baby', cursive",
    fontSize: '2rem',
    whiteSpace: 'nowrap',
    color: '#333',
    overflow: 'hidden',
});

export function BibleSection() {
    const [guestName, setGuestName] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nameFromUrl = params.get('name');
        if (nameFromUrl) {
            setGuestName(decodeURIComponent(nameFromUrl));
        }
    }, []);

    return (
        <RootStyle>
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

            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <InvitationCard
                    // Hiệu ứng zoom in tổng thể khi cuộn tới
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <Quote>
                        <Typography className="quote-text">
                            Nếu Đức Chúa Trời yêu thương chúng ta như thế, <br /> chúng ta cũng phải yêu thương nhau.
                        </Typography>
                        <Typography className="verse">
                            {weddingData.bibleVerse.reference}

                        </Typography>
                    </Quote>

                    <NamesWrapper>
                        <Names>
                            <Typography className="name">
                                {weddingData.groom.nameShort}
                            </Typography>
                            <Box className="divider-decor">
                                <div className="line" />
                                <div className="leaf-icon top" />
                                <div className="leaf-icon bottom" />
                            </Box>
                            <Typography className="name">
                                {weddingData.bride.nameShort}
                            </Typography>
                        </Names>
                    </NamesWrapper>

                    <InvitationWrapper>
                        <InvitationText>Trân Trọng Kính Mời</InvitationText>
                        {guestName && (
                            <GuestNameWrapper>
                                <GuestNameLine>......................</GuestNameLine>
                                <GuestNameOverlay>
                                    {guestName}
                                </GuestNameOverlay>
                            </GuestNameWrapper>
                        )}
                    </InvitationWrapper>
                </InvitationCard>
            </Container>
        </RootStyle>
    );
}