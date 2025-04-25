import Modal from "react-modal";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import styles from "./LoginModal.module.css";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Bitte alle Felder ausfüllen");
      return;
    }

    if (email === "admin@admin.de" && password === "1111") {
      login({ email, role: "admin" });
      toast.success("Willkommen, Admin!");
      onClose();
    } else {
      toast.error("Falsche Zugangsdaten");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Abbrechen
          </button>
          <button type="submit">Einloggen</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
