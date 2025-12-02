import type { UserDetails } from '@/shared/api/users';
import { getUserDetails } from '@/shared/api/users/get-user-details';
import { useState, useEffect } from 'react';
import styles from './user-details.module.css';

type Props = {
  userId: number;
};

export function UserDetails({ userId }: Props) {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserDetails(userId);
        setData(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className={styles['user-details']}>
      <header className={styles['user-details__header']}>
        <div className={styles['user-details__avatar']}>
          {data.name.charAt(0)}
        </div>
        <div className={styles['user-details__header-info']}>
          <h2 className={styles['user-details__name']}>{data.name}</h2>
          <a
            href={`mailto:${data.email}`}
            className={styles['user-details__email']}
          >
            {data.email}
          </a>
        </div>
      </header>

      <div className={styles['user-details__content']}>
        <div className={styles['user-details__grid']}>
          <section className={styles['user-details__section']}>
            <h3 className={styles['user-details__section-title']}>
              Contact Info
            </h3>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>Phone</span>
              <span className={styles['user-details__value']}>
                {data.phone}
              </span>
            </div>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>Website</span>
              <a
                href={`http://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['user-details__link']}
              >
                {data.website}
              </a>
            </div>
          </section>

          <section className={styles['user-details__section']}>
            <h3 className={styles['user-details__section-title']}>Address</h3>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__value']}>
                {data.address.street}, {data.address.suite}
                <br />
                {data.address.city}, {data.address.zipcode}
              </span>
            </div>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>Coordinates</span>
              <span className={styles['user-details__value']}>
                {data.address.geo.lat}, {data.address.geo.lng}
              </span>
            </div>
          </section>
        </div>

        <section className={styles['user-details__section']}>
          <h3 className={styles['user-details__section-title']}>Company</h3>
          <div className={styles['user-details__grid']}>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>Name</span>
              <span className={styles['user-details__value']}>
                {data.company.name}
              </span>
            </div>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>
                Catch Phrase
              </span>
              <span className={styles['user-details__value']}>
                &ldquo;{data.company.catchPhrase}&rdquo;
              </span>
            </div>
            <div className={styles['user-details__row']}>
              <span className={styles['user-details__label']}>Business</span>
              <span className={styles['user-details__value']}>
                {data.company.bs}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
