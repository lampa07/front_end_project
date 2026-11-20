import styles from './UserProfile.module.css';

export const UserProfile = ({ user, onLogin, onLogout }) => {
  if (!user) {
    return <button className={styles.authAction} type="button" onClick={() => onLogin()}>Sign in</button>;
  }

  return (
    <div className={styles.userProfile}>
      <img src={user.avatarUrl || user.avatar} alt={user.name} className={styles.avatar} />
      <div className={styles.userInfo}>
        <span className={styles.userName}>{user.name}</span>
        <small className={styles.userRole}>{user.role}</small>
      </div>
      <button className={styles.authAction} type="button" onClick={onLogout}>Sign out</button>
    </div>
  );
};