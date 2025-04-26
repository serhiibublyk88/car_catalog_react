import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../../components/ui/header/Header';
import Loader from './Loader';

const Home = lazy(() => import('../screen/home/Home'));
const CarDetail = lazy(() => import('../screen/car-detail/CarDetail'));
const LoginModal = lazy(() => import('./loginModal/LoginModal'));

const Router = () => {
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

export default Router;
