import { useCallback } from 'react';
import Modal from 'react-modal';
import styles from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Bestätigung zum Löschen"
      role="dialog"
    >
      <h2 className={styles.title}>
        Möchten Sie dieses Auto wirklich löschen?
      </h2>
      <div className={styles.actions}>
        <button type="button" onClick={handleClose}>
          Abbrechen
        </button>
        <button type="button" onClick={handleConfirm}>
          Löschen
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
