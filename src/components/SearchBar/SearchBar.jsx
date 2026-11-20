import styles from './SearchBar.module.css';

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by brand or model..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};