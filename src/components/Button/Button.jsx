import styles from './Button.module.css';

export const Button = ({ text, variant = 'primary', isDisabled, onClick, type = 'button' }) => {
  const btnClass = `${styles.btn} ${styles[variant] || styles.primary}`;
  return (
    <button className={btnClass} type={type} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
};