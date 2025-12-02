import { getUsers, type User } from '@/shared/api/users';
import styles from './users-list.module.css';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

type Props = {
  selectedUserId: number | null;
  onUserSelect: (userId: number | null) => void;
};

export function UsersList({ selectedUserId, onUserSelect }: Props) {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers({ search: searchTerm });
        setData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles['users-list']}>
      <div className={styles['users-list__search']}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles['users-list__search-input']}
        />
      </div>

      <ul className={styles['users-list__items']}>
        {data?.map((user) => (
          <li
            key={user.id}
            className={clsx(
              styles['users-list__item'],
              selectedUserId === user.id &&
                styles['users-list__item--selected'],
            )}
            onClick={() =>
              onUserSelect(selectedUserId === user.id ? null : user.id)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onUserSelect(selectedUserId === user.id ? null : user.id);
              }
            }}
          >
            <div className={styles['users-list__item-header']}>
              <h3 className={styles['users-list__item-name']}>{user.name}</h3>
              <span className={styles['users-list__item-username']}>
                {user.username}
              </span>
            </div>
            <p className={styles['users-list__item-email']}>{user.email}</p>
          </li>
        ))}
      </ul>

      {data?.length === 0 && (
        <div className={styles['users-list__empty']}>
          No users found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
