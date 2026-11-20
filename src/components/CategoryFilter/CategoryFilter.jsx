import styles from './CategoryFilter.module.css';

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.filterContainer}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};