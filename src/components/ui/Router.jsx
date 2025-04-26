import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from '../screen/home/Home';
import CarDetail from '../screen/car-detail/CarDetail';
import Header from '../../components/ui/header/Header';
import LoginModal from '../../components/ui/loginModal/LoginModal';

const Router = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </BrowserRouter>
  );
};

export default Router;
