import { useQueryClient } from '@tanstack/react-query';
import { lazy, Suspense, useCallback, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks';
import { CarService } from '@/services';
import { Loader } from '@/components/ui';
import styles from './CarItem.module.css';

const ConfirmDeleteModal = lazy(() =>
  import('@/components/ui/confirm-delete-modal/ConfirmDeleteModal').then(
    (module) => ({
      default: module.ConfirmDeleteModal,
    })
  )
);

export const CarItem = ({ car, isBig = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = useCallback(() => {
    navigate(`/cars/${car.id}?edit=true`);
  }, [navigate, car.id]);

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await CarService.deleteCar(car.id);
      toast.success('Auto erfolgreich gelöscht!');
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries(['cars']);
    } catch {
      toast.error('Fehler beim Löschen');
    }
  }, [car.id, queryClient]);

  const backgroundImage = car.image
    ? `url(${car.image})`
    : 'url(/default-car.jpg)';

  return (
    <div className={`${styles.item} ${isBig ? styles.big : ''}`}>
      {user?.role === 'admin' && (
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={handleEdit}
            title="Bearbeiten"
          >
            <FiEdit />
          </button>
          <button
            className={styles.iconButton}
            onClick={handleOpenDeleteModal}
            title="Löschen"
          >
            <FiTrash2 />
          </button>
        </div>
      )}

      <div className={styles.image} style={{ backgroundImage }}></div>

      <div className={styles.info}>
        <h2>{car.name}</h2>
        <p>
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(car.price)}
        </p>
        <Link to={`/cars/${car.id}`} className={styles.readMoreLink}>
          Read more
        </Link>
      </div>

      <Suspense fallback={<Loader />}>
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleDelete}
          />
        )}
      </Suspense>
    </div>
  );
};
