import { lazy, Suspense, useState, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import WeddingStepGuests from 'src/sections/wedding/WeddingStepGuests';
import LoadingScreen from './components/LoadingScreen';

// Import trang Wedding
const WeddingPage = lazy(() => import('src/pages/wedding'));

export function Router() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Khai báo và gọi useRoutes ngay lập tức, không có điều kiện
  const routes = useRoutes([
    {
      path: '/',
      element: (
        // Sử dụng Suspense với fallback null vì màn hình loading đã được xử lý
        <Suspense fallback={null}>
          <WeddingPage />
        </Suspense>
      ),
    },
     {
      path: '/link-generator',
      element: <WeddingStepGuests />,  
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  // useEffect để xử lý hiệu ứng loading ban đầu
  // useEffect(() => {
  //   // Thời gian của hiệu ứng, khớp với duration trong framer-motion
  //   const animationDuration = 2500; // 2.5 giây
  //   const fadeOutDuration = 500; // Thời gian hiệu ứng mờ dần
  //   const totalDuration = animationDuration + fadeOutDuration;

  //   const timer = setTimeout(() => {
  //     setIsInitialLoad(false);
  //   }, totalDuration);

  //   return () => clearTimeout(timer);
  // }, []);

  // Nếu đang trong trạng thái loading, hiển thị màn hình loading
 if (isInitialLoad) {
  return <LoadingScreen onComplete={() => setIsInitialLoad(false)} />;
}

  // Sau khi loading hoàn tất, hiển thị các routes đã được định nghĩa
  return routes;
}