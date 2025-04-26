import { toast } from 'react-toastify';

export const useToast = () => {
  const success = (message) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
    });

  const error = (message) =>
    toast.error(message, {
      position: 'top-center',
      autoClose: 4000,
    });

  const warn = (message) =>
    toast.warn(message, {
      position: 'top-center',
      autoClose: 3000,
    });

  return { success, error, warn };
};
