import { Button } from '../Button/Button';
import styles from './HeroSection.module.css';

export const HeroSection = ({
  heading = 'Drive the Extraordinary',
  subheading = 'Choose from luxury sports cars, comfortable electric sedans, and rugged SUVs.',
  buttonText = 'Explore Catalog',
  onAction,
}) => {
  return (
    <section className={styles.heroSection}>
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <Button text={buttonText} variant="primary" onClick={onAction} />
    </section>
  );
};