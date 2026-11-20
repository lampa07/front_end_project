import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

export const ProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        : 0;
      setScroll(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};
