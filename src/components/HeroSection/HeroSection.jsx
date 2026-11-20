import { Button } from '../Button/Button';
import styles from './HeroSection.module.css';

export const HeroSection = ({
  heading = 'Drive the Extraordinary',
  subheading = 'Choose from luxury sports cars, comfortable electric sedans, and rugged SUVs.',
  buttonText = 'Explore Catalog',
  onAction,
  variant = 'default',
  brand,
  imageUrl,
  imageAlt,
  benefits = [],
}) => {
  if (variant === 'gear') {
    return (
      <section className={`${styles.heroSection} ${styles.gearHero}`}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            {brand && <p className={styles.brandLabel}>{brand}</p>}
            <h1>{heading}</h1>
            <p className={styles.heroDescription}>{subheading}</p>
            <Button text={buttonText} variant="primary" onClick={onAction} />
          </div>
          {imageUrl && (
            <div className={styles.heroVisual}>
              <img src={imageUrl} alt={imageAlt || ''} />
            </div>
          )}
        </div>
        {benefits.length > 0 && (
          <div className={styles.benefits}>
            {benefits.map(({ title, description }, index) => (
              <article className={styles.benefit} key={title}>
                <span className={styles.benefitNumber}>0{index + 1}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <Button text={buttonText} variant="primary" onClick={onAction} />
    </section>
  );
};