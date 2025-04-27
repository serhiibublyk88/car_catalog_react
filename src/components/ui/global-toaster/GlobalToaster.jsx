import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalToaster = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};
