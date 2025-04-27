import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { FiFilter, FiPlus } from 'react-icons/fi';
import { useAuth } from '@/hooks';
import { CarService } from '@/services';
import { CarItem, Loader } from '@/components/ui';
import styles from './Home.module.css';

const AddCarModal = lazy(() =>
  import('@/components/ui/add-car-modal/AddCarModal').then((module) => ({
    default: module.AddCarModal,
  }))
);

export const Home = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const { user } = useAuth();

  const {
    data: cars = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['cars'],
    queryFn: CarService.getAll,
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => car.price >= minPrice);
  }, [cars, minPrice]);

  const handleOpenAddCar = useCallback(() => setIsAddCarOpen(true), []);
  const handleCloseAddCar = useCallback(() => setIsAddCarOpen(false), []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Autos Katalog</h1>
      </div>

      <div className={styles.actionsRow}>
        {user?.role === 'admin' && (
          <button
            className={styles.iconButton}
            onClick={handleOpenAddCar}
            title="Auto hinzufügen"
          >
            <FiPlus />
          </button>
        )}

        <button
          className={styles.filterIcon}
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          title="Filter anzeigen"
        >
          <FiFilter />
        </button>
      </div>

      {isFilterVisible && (
        <div className={styles.filterBlock}>
          <label>
            Minimaler Preis:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <div className={styles.list}>
        {isLoading && <Loader />}
        {isError && <p>Fehler: {error.message}</p>}
        {!isLoading && !isError && filteredCars.length > 0
          ? filteredCars.map((car) => <CarItem key={car.id} car={car} />)
          : !isLoading && !isError && <p>Keine passenden Autos gefunden.</p>}
      </div>

      <Suspense fallback={<Loader />}>
        {isAddCarOpen && (
          <AddCarModal isOpen={isAddCarOpen} onClose={handleCloseAddCar} />
        )}
      </Suspense>
    </div>
  );
};
