/* eslint-disable */
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Container, Typography, Button } from '@mui/material';
import { Heart } from 'lucide-react';
import { red } from '@mui/material/colors';
import { weddingData } from './weddingData';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundImage: 'url("https://res.cloudinary.com/difiyurn7/image/upload/v1754986206/ChatGPT_Image_15_09_58_12_thg_8_2025_jjdwwo.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  minHeight: '100vh',
   '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,0.01), rgba(255,255,255,0.1), rgba(255,255,255,0.01))',
        zIndex: 1,
    },
  padding: theme.spacing(12, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 1),
  },
}));

const MainTitle = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '& .title-handwriting': {
    fontFamily: "'Oooh Baby', cursive",
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    color: '#928362',
  },
  '& .title-sans': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#333',
    fontWeight: 500,
  }
}));

const Divider = styled(motion.div)({
  width: '60px',
  height: '2px',
  backgroundColor: '#333',
  margin: '0 auto 40px',
});

const PhotoGrid = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(6),
  '& .photo': {
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    //  filter: 'grayscale(100%)',
    filter: 'grayscale(100%) blur(0.3px)',
    //  filter: 'grayscale(100%) contrast(90%) brightness(110%)',
    opacity: 0.9
  },
  '& .photo-small': {
    width: '100px',
    height: '130px',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
      height: '100px',
    },
  },
  '& .photo-large': {
    width: '150px',
    height: '180px',
    [theme.breakpoints.down('sm')]: {
      width: '120px',
      height: '150px',
    },
  }
}));

const MonthTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Oooh Baby', cursive",
  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
  color: '#000',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const CalendarGrid = styled(motion.div)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
  color: '#333',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'contents',
  '& .day-of-week': {
    fontWeight: 500,
    padding: theme.spacing(1, 0),
  }
}));

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const drawLoopAnimation = keyframes`
  0% { stroke-dashoffset: 1000; opacity: 0; }
  10% { stroke-dashoffset: 1000; opacity: 1; }
  70% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
`;

const CalendarDay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40px',
  color: '#666',
  '&.is-event-day': {
    fontWeight: 'bold',
    color: '#000',
    // backgroundColor: '#fff',
    // border: '1px solid transparent',
    // borderRadius: '50%',
  },
}));

const PencilSVG = styled('svg')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px',
  height: '50px',
  pointerEvents: 'none',
  '& path': {
    stroke: '#070707',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeDasharray: '10000',
    strokeDashoffset: '1000',
    fill: 'none',
    // animation: `${drawLoopAnimation} 5s infinite`,
  },
});

const BlinkingHeart = styled(motion.div)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '1.5rem',
  color: red[500],
  animation: `${blink} 2s infinite`,
  pointerEvents: 'none',
});

const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getCalendarData = (month: number, year: number) => {
  const days = getDaysInMonth(month - 1, year);
  const firstDay = days[0].getDay();
  // Adjust for week starting on MON instead of SUN
  const leadingBlanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill('');
  return [...leadingBlanks, ...days.map(d => d.getDate())];
};

const InfoSection = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '& .party-time': {
    fontFamily: "'Oooh Baby', cursive",
    fontSize: 'clamp(2rem, 2.5vw, 2rem)',
    color: '#333',
    fontWeight: 600
  }
}));
const InfoSectionLocation = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  fontStyle: 'italic',
  fontFamily: "'Oooh Baby', cursive",
  fontSize: 'clamp(2rem, 2.5vw, 2rem)',
  color: '#333',
  fontWeight: 700
}));
const DateTable = styled(motion.div)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2px 1fr 2px 1fr',
  justifyItems: 'center',
  alignItems: 'center',
  margin: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
  },
}));

const DateItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 10px',
  '& .label': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    color: '#666',
  },
  '& .value': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
    color: '#333',
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  '& .separator': {
    width: '1px',
    height: '60px',
    backgroundColor: '#ccc',
  }
}));

const RestaurantInfo = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '& .restaurant-name': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  '& .restaurant-address': {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    color: '#666',
    lineHeight: 1.6,
    marginTop: theme.spacing(0.5),
    maxWidth: '400px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      maxWidth: '400px',
    }
  }

}));
const WaveTransition = styled('div')(({ theme }) => ({
  width: '100%',
  height: '30px',
  zIndex: 2,
  overflow: 'hidden',
  '& svg': {
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fill: theme.palette.background.paper,
  },
}));
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 1, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function EventDetailsSection() {
  const event = weddingData.events[0];
  const photos = weddingData.images.albumPhotos;

  // Parse date from event.date string
  const dateParts = event.date.split('-').map(Number);
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];

  const calendarDays = getCalendarData(month, year);

  return (
    <RootStyle id="wedding-invitation">
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.3 }}
        >
          <MainTitle variants={itemVariants}>
            <Typography className="title-handwriting">{weddingData.invitationNote}</Typography>
            <Typography className="title-sans">{weddingData.title2}</Typography>
          </MainTitle>

          <Divider variants={itemVariants} />

          <PhotoGrid variants={staggerContainer}>
            <motion.img variants={itemVariants} src={photos[16]} alt="Groom and Bride" className="photo photo-small" />
            <motion.img variants={itemVariants} src={photos[2]} alt="Groom and Bride" className="photo photo-large" />
            <motion.img variants={itemVariants} src={photos[18]} alt="Groom and Bride" className="photo photo-small" />
          </PhotoGrid>

          <MonthTitle >
            Tháng {month} - {year}
          </MonthTitle>

          <CalendarGrid variants={staggerContainer}>
            <CalendarHeader>
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((dayOfWeek, index) => (
                <motion.div key={index} variants={itemVariants} className="day-of-week">
                  {dayOfWeek}
                </motion.div>
              ))}
            </CalendarHeader>
            {calendarDays.map((calendarDay, index) => (
              <motion.div key={index} variants={itemVariants}>
                <CalendarDay
                  className={calendarDay === day ? 'is-event-day' : ''}
                >
                  {calendarDay}
                  {calendarDay === day && (
                    <>
                      <PencilSVG viewBox="0 0 153 177">
                        <path d="M13.3481 123.474C13.4886 123.699 13.5339 123.97 13.4741 124.229C13.4143 124.487 13.2543 124.711 13.0293 124.852C12.8043 124.992 12.5327 125.037 12.2743 124.977C12.0159 124.918 11.7919 124.758 11.6515 124.533C11.6515 124.533 11.6515 124.533 11.6515 124.533C8.84679 119.43 7.78796 113.84 7.75511 108.224C7.63685 102.89 7.66342 97.3088 8.29993 91.9043C10.341 73.5161 17.9364 56.0991 28.3649 40.9991C41.0713 22.9839 59.389 9.39475 79.9647 1.56463C86.2544 -0.0907162 92.5232 0.0300745 98.784 1.55815C113.452 4.28245 128.274 12.1602 136.751 25.0773C136.831 25.1887 136.909 25.3004 136.988 25.4125C145.798 38.1258 150.019 53.2985 151.99 68.3716C155.158 101.219 140.111 134.204 115.641 155.76C101.569 168.241 82.6301 174.22 64.8193 176.944L64.4988 176.997C52.3165 176.648 39.9185 175.656 28.6654 169.849C20.5942 164.724 11.2106 159.293 7.80921 149.321L7.781 149.223C-0.141091 120.636 -2.51067 89.1604 7.80791 60.6779C13.8147 47.0545 23.7509 36.4043 33.2608 25.5754C34.8366 23.8475 36.4353 22.136 38.0584 20.4433C45.9354 12.8983 52.5573 3.95796 63.9995 0.00317431C64.2647 0.00308471 64.5191 0.108356 64.7067 0.295829C64.8943 0.483302 64.9997 0.73762 64.9998 1.00284C64.9999 1.26805 64.8946 1.52244 64.7072 1.71004C64.5197 1.89764 64.2654 2.00308 64.0002 2.00317C64.0002 2.00317 64.0002 2.00317 64.0002 2.00317C54.9449 5.22916 47.0041 14.412 39.5019 21.8276C37.891 23.5076 36.3035 25.207 34.7387 26.923C25.3282 37.5875 15.3053 48.567 9.70234 61.3191C-0.452511 89.4586 1.82359 120.144 9.72924 148.771L9.70103 148.673C12.7249 157.716 21.6389 163.057 29.7118 168.145C40.063 173.526 52.6607 174.7 64.4988 174.997L64.1783 175.05C82.7005 172.122 100.392 166.492 114.355 154.228C138.27 133.232 153.138 100.501 150.006 68.6248C148.07 53.7687 143.886 38.8646 135.35 26.5605C135.274 26.452 135.198 26.3439 135.121 26.2361C126.742 13.6553 113.109 6.32658 98.215 3.47549C92.5996 2.06886 86.135 1.96903 80.5758 3.469C60.625 11.0473 42.3644 24.5576 30.0122 42.1333C19.7259 57.0276 12.2841 74.134 10.2874 92.1281C9.66478 97.443 9.63669 102.796 9.75511 108.224C9.76179 113.512 10.874 118.98 13.3481 123.474Z" />
                      </PencilSVG>
                      <BlinkingHeart
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Heart size={20} color={red[500]} fill={red[500]} />
                      </BlinkingHeart>
                    </>
                  )}
                </CalendarDay>
              </motion.div>
            ))}
          </CalendarGrid>

          <InfoSection variants={itemVariants}>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#333', mb: 1 }}>
              Vào lúc
            </Typography>
            <Typography className="party-time">{event.time}</Typography>
          </InfoSection>

          <DateTable variants={staggerContainer}>

            <motion.div variants={itemVariants}>
              <DateItem>
                <Typography className="label">{event.day}</Typography>
                <Typography className="value">{String(day).padStart(2, '0')}</Typography>
              </DateItem>
            </motion.div>
            <Box sx={{ width: '1px', height: '60px', backgroundColor: '#ccc' }} />
            <motion.div variants={itemVariants}>
              <DateItem>
                <Typography className="label">THÁNG</Typography>
                <Typography className="value">{String(month).padStart(2, '0')}</Typography>
              </DateItem>
            </motion.div>
            <Box sx={{ width: '1px', height: '60px', backgroundColor: '#ccc' }} />
            <motion.div variants={itemVariants}>
              <DateItem>
                <Typography className="label">NĂM</Typography>
                <Typography className="value">{year}</Typography>
              </DateItem>
            </motion.div>
          </DateTable>

          <motion.div variants={itemVariants}>
            <Typography variant="body2" sx={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#666', textAlign: 'center', mb: 2 }}>
              ({event.lunarCalendar})
            </Typography>
          </motion.div>
          <InfoSectionLocation variants={itemVariants}>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#333', mb: 0 }}>
              {/* Tiệc mừng cưới diễn ra tại */}
              <WaveTransition>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17846 0.843094C5.14483 -0.299453 7.56183 -0.279483 9.50975 0.895405C11.4385 2.09422 12.6108 4.23376 12.5999 6.5353C12.555 8.82174 11.298 10.971 9.72673 12.6325C8.81985 13.5958 7.80535 14.4475 6.70396 15.1704C6.59053 15.236 6.46628 15.2799 6.33734 15.3C6.21324 15.2947 6.09239 15.258 5.98568 15.1933C4.30418 14.1071 2.829 12.7206 1.6311 11.1006C0.628731 9.74823 0.0592531 8.11441 1.99923e-06 6.42098C-0.00129925 4.11502 1.21209 1.98564 3.17846 0.843094ZM4.31507 7.37541C4.64584 8.19086 5.42658 8.72276 6.29276 8.72277C6.86021 8.72684 7.40569 8.49955 7.80765 8.09153C8.20961 7.68352 8.43465 7.12868 8.43264 6.55065C8.43567 5.66834 7.91623 4.87119 7.11686 4.5314C6.31748 4.19162 5.39586 4.37622 4.78231 4.99902C4.16875 5.62182 3.9843 6.55996 4.31507 7.37541Z" fill="#B29659" />
                  <ellipse opacity="0.4" cx="6.29956" cy="17.0999" rx="4.5" ry="0.9" fill="#B29659" />
                </svg>
              </WaveTransition>
            </Typography>
          </InfoSectionLocation>
          <RestaurantInfo variants={staggerContainer}>
            <motion.div variants={itemVariants}>
              <Typography className="restaurant-name">{event.restauracnceName}</Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography className="restaurant-address">{event.location}</Typography>
            </motion.div>
          </RestaurantInfo>

          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="text"
              href="https://maps.app.goo.gl/zdNkCSJBQELdUKxb8"
              target="_blank"
              sx={{
                mt: 3,
                textTransform: 'uppercase',
                fontFamily: "'Playfair Display', serif",
                color: '#333',
                fontSize: '1rem',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              Chỉ Đường
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </RootStyle>
  );
}
