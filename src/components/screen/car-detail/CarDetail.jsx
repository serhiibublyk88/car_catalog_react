import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CarService } from "../../../services/car.service";
import styles from "./CarDetail.module.css";
import { toast } from "react-toastify";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const queryClient = useQueryClient();

  const {
    data: car,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => CarService.getById(id),
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (car) {
      setName(car.name);
      setPrice(car.price);
      setDescription(car.description || "");
      setImage(car.image || "");
    }
  }, [car]);

  const mutation = useMutation({
    mutationFn: (updatedCar) => CarService.update(id, updatedCar),
    onSuccess: () => {
      toast.success("Auto wurde erfolgreich aktualisiert!");
      queryClient.invalidateQueries(["car", id]);
      navigate(`/cars/${id}`);
    },
    onError: () => {
      toast.error("Fehler beim Aktualisieren.");
    },
  });

  const handleSave = () => {
    if (!name || !price || !image) {
      toast.warn("Bitte alle Felder ausfüllen");
      return;
    }

    mutation.mutate({ name, price: Number(price), description, image });
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
        <img className={styles.image} src={image} alt={name} />

        {isEdit ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Name"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input}
              placeholder="Preis"
            />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
              placeholder="Bild-URL"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Preis:{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(car.price)}
            </p>
            <p className={styles.description}>
              {car.description ||
                "Hier könnte eine ausführliche Beschreibung stehen..."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetail;
