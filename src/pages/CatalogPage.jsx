import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CarsCatalog } from '../components/CarsCatalog/CarsCatalog';
import { Container } from '../components/Container/Container';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { StatCard } from '../components/StatCard/StatCard';
import { TestimonialCard } from '../components/TestimonialCard/TestimonialCard';
import { QuickViewModal } from '../components/QuickViewModal/QuickViewModal';
import { initialCars, categoriesList, statsList, initialReviews } from '../data/mockData';

const SORT_OPTIONS = ['price-asc', 'price-desc', 'rating-desc'];

function loadCars(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abortLoad);
      resolve(initialCars);
    }, 350);

    function abortLoad() {
      clearTimeout(timer);
      reject(new DOMException('The operation was aborted.', 'AbortError'));
    }

    signal.addEventListener('abort', abortLoad, { once: true });
  });
}

function readPage(searchParams) {
  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  return (
    <CatalogPageContent
      key={searchTerm}
      searchTerm={searchTerm}
    />
  );
}

function CatalogPageContent({ searchTerm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const selectedCategory = categoriesList.includes(categoryParam) ? categoryParam : 'All';
  const rawSortBy = searchParams.get('sort') || 'price-asc';
  const sortBy = SORT_OPTIONS.includes(rawSortBy) ? rawSortBy : 'price-asc';
  const currentPage = readPage(searchParams);
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    document.title = selectedCategory === 'All'
      ? 'DriveSelect — Premium Car Rental'
      : `${selectedCategory} Cars | DriveSelect`;
  }, [selectedCategory]);

  useEffect(() => {
    if (searchInput.trim() === searchTerm) return undefined;

    const timeout = setTimeout(() => {
      setIsLoading(true);
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        if (searchInput.trim()) nextParams.set('search', searchInput.trim());
        else nextParams.delete('search');
        nextParams.delete('page');
        return nextParams;
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput, searchTerm, setSearchParams]);

  useEffect(() => {
    const controller = new AbortController();

    loadCars(controller.signal)
      .then((data) => {
        setCars(data);
        setIsLoading(false);
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setError('Could not load the vehicle catalog. Please try again.');
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [selectedCategory, currentPage, searchTerm, reloadToken]);

  const updateParams = (updates) => {
    setIsLoading(true);
    setError('');
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (key === 'page' && value === 1) ||
        (key === 'category' && value === 'All') || (key === 'sort' && value === 'price-asc')) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });
    setSearchParams(nextParams);
  };

  const filteredCars = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    const results = cars.filter((car) => {
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch = car.title.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    return results.sort((first, second) => {
      if (sortBy === 'price-desc') return second.pricePerDay - first.pricePerDay;
      if (sortBy === 'rating-desc') return second.rating - first.rating;
      return first.pricePerDay - second.pricePerDay;
    });
  }, [cars, selectedCategory, searchTerm, sortBy]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const displayedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Container>
        <HeroSection
          heading="Drive the Extraordinary"
          subheading="Choose from luxury sports cars, comfortable electric sedans, and rugged SUVs."
          buttonText="Explore Fleet"
          onAction={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
        />

        <section id="cars" className="section-padding">
          <SectionHeader
            title="Available Vehicles"
            subtitle="Find the perfect match for your next road trip or business event"
          />

          {error ? (
            <div className="status-card error-state" role="alert">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setIsLoading(true);
                  setReloadToken((token) => token + 1);
                }}
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="status-card loading-state" role="status" aria-live="polite">
              <span className="spinner" aria-hidden="true" />
              <span>Loading vehicle fleet…</span>
            </div>
          ) : (
            <CarsCatalog
              cars={displayedCars}
              categories={categoriesList}
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => updateParams({ category, page: 1 })}
              searchQuery={searchInput}
              setSearchQuery={setSearchInput}
              sortBy={sortBy}
              setSortBy={(sort) => updateParams({ sort, page: 1 })}
              onOpenQuickView={(car, days) => setBooking({ car, days })}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={(page) => updateParams({ page })}
            />
          )}
        </section>

        <section id="stats" className="section-padding">
          <SectionHeader title="Platform Analytics" subtitle="Service performance at a glance" />
          <div className="stats-grid">
            {statsList.map((stat) => <StatCard key={stat.id} {...stat} />)}
          </div>
        </section>

        <section id="reviews" className="section-padding">
          <SectionHeader title="Customer Testimonials" subtitle="Experiences from our clients" />
          <div className="reviews-grid">
            {initialReviews.map((review) => <TestimonialCard key={review.id} {...review} />)}
          </div>
        </section>
      </Container>
      {booking && (
        <QuickViewModal
          key={booking.car.id}
          car={booking.car}
          days={booking.days}
          onClose={() => setBooking(null)}
        />
      )}
    </>
  );
}
