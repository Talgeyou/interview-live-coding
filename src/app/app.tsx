import { UsersPage } from '../pages/users-page';
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <UsersPage />
    </div>
  );
}
