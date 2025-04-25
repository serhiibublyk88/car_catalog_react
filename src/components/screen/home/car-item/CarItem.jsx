import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query"; 

import styles from "./CarItem.module.css";
import ConfirmDeleteModal from "../../../../components/ui/сonfirmDeleteModal/ConfirmDeleteModal";
import { useAuth } from "../../../../hooks/useAuth";
import { CarService } from "../../../../services/car.service";
import { toast } from "react-toastify";

function CarItem({ car, isBig = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // ✅
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await CarService.deleteCar(car.id);
      toast.success("Auto erfolgreich gelöscht!");
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries(["cars"]); 
    } catch {
      toast.error("Fehler beim Löschen");
    }
  };

  return (
    <div className={`${styles.item} ${isBig ? styles.big : ""}`}>
      {user?.role === "admin" && (
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={() => navigate(`/cars/${car.id}?edit=true`)}
            title="Bearbeiten"
          >
            <FiEdit />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => setIsDeleteModalOpen(true)}
            title="Löschen"
          >
            <FiTrash2 />
          </button>
        </div>
      )}

      <div
        className={styles.image}
        style={{ backgroundImage: `url(${car.image})` }}
      ></div>

      <div className={styles.info}>
        <h2>{car.name}</h2>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(car.price)}
        </p>
        <Link to={`/cars/${car.id}`}>
          <button>Read more</button>
        </Link>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default CarItem;
