import { useState, useCallback, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../hooks/useAuth';
import { CarService } from '../../../../services/car.service';
import { toast } from 'react-toastify';
import styles from './CarItem.module.css';
import Loader from '../../../ui/Loader';

const ConfirmDeleteModal = lazy(
  () => import('../../../ui/сonfirmDeleteModal/ConfirmDeleteModal')
);

function CarItem({ car, isBig = false }) {
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
    : 'url(/default-car.jpg)'; // запасная картинка если нет изображения

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
}

export default CarItem;
