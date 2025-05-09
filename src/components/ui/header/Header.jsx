import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './Header.module.css';

export const Header = ({ onLoginClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        CARSCATALOG
      </Link>

      <div className={styles.actions}>
        {user ? (
          <>
            <div className={styles.userInfo}>
              <FiUser className={styles.userIcon} />
              <span className={styles.email}>{user.email}</span>
            </div>
            <button
              onClick={logout}
              className={styles.iconButton}
              title="Logout"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            className={styles.iconButton}
            title="Login"
          >
            <FiLogIn />
          </button>
        )}
      </div>
    </header>
  );
};
