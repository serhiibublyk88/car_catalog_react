import { useMemo, useState } from "react";
import styles from "./Home.module.css";
import CarItem from "./car-item/CarItem";
import { useQuery } from "@tanstack/react-query";
import { CarService } from "../../../services/car.service";
import { FiFilter, FiPlus } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import AddCarModal from "../../../components/ui/addCarModal/AddCarModal";

function Home() {
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
    queryKey: ["cars"],
    queryFn: CarService.getAll,
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => car.price >= minPrice);
  }, [cars, minPrice]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Autos Katalog</h1>
      </div>

      <div className={styles.actionsRow}>
        {user?.role === "admin" && (
          <button
            className={styles.iconButton}
            onClick={() => setIsAddCarOpen(true)}
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

      <div className={styles.filterWrapper}>
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
      </div>

      <div className={styles.list}>
        {isLoading && <p>Lade Autos...</p>}
        {isError && <p>Fehler: {error.message}</p>}
        {!isLoading && !isError && filteredCars.length > 0
          ? filteredCars.map((car) => <CarItem key={car.id} car={car} />)
          : !isLoading && !isError && <p>Keine passenden Autos gefunden.</p>}
      </div>

      <AddCarModal
        isOpen={isAddCarOpen}
        onClose={() => setIsAddCarOpen(false)}
      />
    </div>
  );
}

export default Home;
