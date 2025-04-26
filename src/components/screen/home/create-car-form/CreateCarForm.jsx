import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CarService } from '../../../../services/car.service';
import { useToast } from '../../../../hooks/useToast';
import styles from './CreateCarForm.module.css';

const CreateCarForm = () => {
  const [data, setData] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { success, error, warn } = useToast();
  const queryClient = useQueryClient();

  const resetForm = () => {
    setData({ name: '', price: '', image: '' });
  };

  const { mutate } = useMutation({
    mutationFn: (newCar) => CarService.create(newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      success('Auto wurde erfolgreich hinzugefügt!');
      resetForm();
    },
    onError: (err) => {
      console.error('Fehler beim Speichern:', err);
      error('Fehler beim Speichern des Autos.');
    },
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const createCar = useCallback(
    (e) => {
      e.preventDefault();

      if (!data.name || !data.price || !data.image) {
        warn('Bitte füllen Sie alle Felder aus.');
        return;
      }

      mutate({ ...data, price: Number(data.price) });
    },
    [data, mutate, warn]
  );

  return (
    <form className={styles.form} onSubmit={createCar}>
      <h2>Neues Auto hinzufügen</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Preis"
        value={data.price}
        min="0"
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Bild-URL"
        value={data.image}
        onChange={handleChange}
      />

      <button type="submit">Speichern</button>
    </form>
  );
};

export default CreateCarForm;
