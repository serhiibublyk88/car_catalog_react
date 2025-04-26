import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '../../components/ui/header/Header';
import LoginModal from '../../components/ui/loginModal/LoginModal';
import Loader from './Loader';

// Ленивая загрузка страниц
const Home = lazy(() => import('../screen/home/Home'));
const CarDetail = lazy(() => import('../screen/car-detail/CarDetail'));

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
      </Suspense>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </BrowserRouter>
  );
};

export default Router;
