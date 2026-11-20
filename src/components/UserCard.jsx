import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

export function UserCard({ user }) {
  return (
    <article className={styles.userCard}>
      <h2 className={styles.name}>{user.name}</h2>
      <dl className={styles.details}>
        <div>
          <dt>Username</dt>
          <dd>{user.username}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{user.company?.name}</dd>
        </div>
      </dl>
      <Link className={styles.detailsLink} to={`/users/${user.id}`}>
        View Details
      </Link>
    </article>
  );
}