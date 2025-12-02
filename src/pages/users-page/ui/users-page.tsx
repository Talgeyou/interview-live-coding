import { UserDetails } from './user-details';
import { UsersList } from './users-list';
import styles from './users-page.module.css';
import { useState } from 'react';

export function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className={styles['users-page']}>
      <header className={styles['users-page__header']}>
        <h1 className={styles['users-page__title']}>Users</h1>
      </header>

      <div className={styles['users-page__content']}>
        <UsersList
          selectedUserId={selectedUserId}
          onUserSelect={setSelectedUserId}
        />
        {selectedUserId ? (
          <UserDetails userId={selectedUserId} />
        ) : (
          <div className={styles['users-page__placeholder']}>
            Select a user to view details
          </div>
        )}
      </div>
    </div>
  );
}
