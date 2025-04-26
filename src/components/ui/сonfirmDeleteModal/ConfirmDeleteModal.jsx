import Modal from 'react-modal';
import styles from './ConfirmDeleteModal.module.css';

Modal.setAppElement('#root');

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.title}>
        Möchten Sie dieses Auto wirklich löschen?
      </h2>
      <div className={styles.actions}>
        <button type="button" onClick={onClose}>
          Abbrechen
        </button>
        <button type="button" onClick={onConfirm}>
          Löschen
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
