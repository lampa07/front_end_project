import { UserCard } from './UserCard';
import styles from './UserCard.module.css';

export function UserList({ users }) {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}