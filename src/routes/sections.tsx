import { lazy, Suspense, useState, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { varAlpha } from 'src/theme/styles';
import { DashboardLayout } from 'src/layouts/dashboard';
import WeddingStepGuests from 'src/sections/wedding/WeddingStepGuests';
import AlbumPage from 'src/pages/album';
import QRCodeDisplay from 'src/sections/QRCodeDisplay/QRCodeDisplay';
import { AuthLayout } from 'src/layouts/auth';
import Slideshow from 'src/sections/album/Slideshow';
import { LoadingScreen } from 'src/components/loading/loading-screen';
export const SignInPage = lazy(() => import('src/pages/sign-in'));

// Import trang Wedding
const WeddingPage = lazy(() => import('src/pages/wedding'));

export function Router() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const renderFallback = () => (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LinearProgress
        sx={{
          width: 1,
          maxWidth: 320,
          bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
        }}
      />
    </Box>
  );
  // Khai báo và gọi useRoutes ngay lập tức, không có điều kiện
  const routes = useRoutes([
    {
      // Đây là route cho trang wedding bình thường
      path: '/',
      element: (
        <Suspense fallback={null}>
          <WeddingPage />
        </Suspense>
      ),
    },
    {
      // Thêm route cho khách mời của ba mẹ
      // Đường dẫn /p/ sẽ được xử lý riêng
      path: '/p/*',
      element: (

        <Suspense fallback={null}>
          <WeddingPage />
        </Suspense>
      ),
    },
     {
      // Thêm route cho khách mời của ba mẹ
      // Đường dẫn /p/ sẽ được xử lý riêng
      path: '/album-slide',
      element: (

        <Suspense fallback={null}>
          <QRCodeDisplay />
        </Suspense>
      ),
    },
    
    {
      path: '/link-generator',
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <WeddingStepGuests />
          </Suspense>
        </DashboardLayout>
      ),
    },

     {
      path: '/album',
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <AlbumPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
     {
      path: '/slide-wedding',
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Slideshow />
          </Suspense>
        </DashboardLayout>
      ),
    },
    
     {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  useEffect(() => {
    const animationDuration = 2500;
    const fadeOutDuration = 500;
    const totalDuration = animationDuration + fadeOutDuration;

    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoad) {
    return <LoadingScreen onComplete={() => { }} />;
  }

  return routes;
}