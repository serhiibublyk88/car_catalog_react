import Modal from 'react-modal';
import { useState, useCallback } from 'react';
import styles from './AddCarModal.module.css';
import { toast } from 'react-toastify';
import { CarService } from '../../../services/car.service';
import { useQueryClient } from '@tanstack/react-query';

Modal.setAppElement('#root');

const AddCarModal = ({ isOpen, onClose }) => {
  const [carData, setCarData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const queryClient = useQueryClient();

  const resetForm = useCallback(() => {
    setCarData({ name: '', price: '', image: '', description: '' });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!carData.name || !carData.price || !carData.image) {
        toast.warn('Bitte alle Felder ausfüllen');
        return;
      }

      try {
        await CarService.create({
          ...carData,
          price: Number(carData.price),
          description: carData.description.trim() || undefined,
        });

        toast.success('Auto hinzugefügt');
        queryClient.invalidateQueries(['cars']);
        resetForm();
        onClose();
      } catch (err) {
        toast.error(err?.message || 'Fehler beim Hinzufügen');
      }
    },
    [carData, queryClient, onClose, resetForm]
  );

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
          value={carData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Preis"
          value={carData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Bild-URL"
          value={carData.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Beschreibung"
          value={carData.description}
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
