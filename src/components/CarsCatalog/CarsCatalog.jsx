import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { SearchBar } from '../SearchBar/SearchBar';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import { CarCard } from '../CarCard/CarCard';
import { Pagination } from '../Pagination/Pagination';
import styles from './CarsCatalog.module.css';

export const CarsCatalog = ({
  cars,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onOpenQuickView,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.controlsBar}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <div className={styles.searchSortGroup}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {cars.length > 0 ? (
        <div className={styles.carsGrid}>
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>No equipment found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};