import Modal from "react-modal";
import { useState } from "react";
import styles from "./AddCarModal.module.css";
import { toast } from "react-toastify";
import { CarService } from "../../../services/car.service";
import { useQueryClient } from "@tanstack/react-query";

Modal.setAppElement("#root");

const AddCarModal = ({ isOpen, onClose }) => {
  const [car, setCar] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car.name || !car.price || !car.image) {
      toast.warn("Bitte alle Felder ausfüllen");
      return;
    }

    try {
      await CarService.create({
        ...car,
        price: Number(car.price),
        description: car.description.trim() || undefined,
      });

      toast.success("Auto hinzugefügt");
      queryClient.invalidateQueries(["cars"]);
      setCar({ name: "", price: "", image: "", description: "" });
      onClose();
    } catch {
      toast.error("Fehler beim Hinzufügen");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.title}>Auto hinzufügen</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={car.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preis"
          value={car.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Bild-URL"
          value={car.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Beschreibung"
          value={car.description}
          onChange={handleChange}
          rows={3}
          className={styles.textarea}
        />

        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Abbrechen
          </button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCarModal;
