import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Loader } from '@/components/ui';

const Home = lazy(() =>
  import('@/components/screen/home/Home').then((module) => ({
    default: module.Home,
  }))
);
const CarDetail = lazy(() =>
  import('@/components/screen/car-detail/CarDetail').then((module) => ({
    default: module.CarDetail,
  }))
);
const LoginModal = lazy(() =>
  import('@/components/ui/login-modal/LoginModal').then((module) => ({
    default: module.LoginModal,
  }))
);

export const Router = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>

        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </Suspense>
    </BrowserRouter>
  );
};
