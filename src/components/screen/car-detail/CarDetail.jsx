import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CarService } from '../../../services/car.service';
import styles from './CarDetail.module.css';
import { toast } from 'react-toastify';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';

  const queryClient = useQueryClient();

  const {
    data: car,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () =>
      id ? CarService.getById(id) : Promise.reject('Kein ID angegeben'),
    enabled: Boolean(id), // Запрос только если id есть
  });

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || '',
        price: car.price || '',
        description: car.description || '',
        image: car.image || '',
      });
    }
  }, [car]);

  const mutation = useMutation({
    mutationFn: (updatedCar) => CarService.update(id, updatedCar),
    onSuccess: () => {
      toast.success('Auto wurde erfolgreich aktualisiert!');
      queryClient.invalidateQueries(['car', id]);
      navigate(`/cars/${id}`);
    },
    onError: () => {
      toast.error('Fehler beim Aktualisieren.');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) {
      toast.warn('Bitte alle Felder ausfüllen');
      return;
    }

    mutation.mutate({
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image,
    });
  };

  const handleCancel = () => {
    navigate(`/cars/${id}`);
  };

  if (isLoading) return <div>Auto wird geladen...</div>;
  if (isError) return <div>Fehler: {error.message}</div>;
  if (!car) return <div>Auto nicht gefunden.</div>;

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Zurück
      </button>

      <div className={styles.detail}>
        {formData.image && (
          <img
            className={styles.image}
            src={formData.image}
            alt={formData.name}
          />
        )}

        {isEdit ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Name"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              placeholder="Preis"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={styles.input}
              placeholder="Bild-URL"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={4}
              placeholder="Beschreibung"
            />
            <div className={styles.actions}>
              <button onClick={handleCancel}>Abbrechen</button>
              <button onClick={handleSave}>Speichern</button>
            </div>
          </>
        ) : (
          <>
            <h1>{car.name}</h1>
            <p className={styles.price}>
              Preis:{' '}
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
              }).format(car.price)}
            </p>
            <p className={styles.description}>
              {car.description ||
                'Hier könnte eine ausführliche Beschreibung stehen...'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetail;
