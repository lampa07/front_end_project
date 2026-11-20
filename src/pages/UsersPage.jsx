import { useMemo, useState } from 'react';
import { Container } from '../components/Container/Container';
import { UserList } from '../components/UserList';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import styles from './UsersPage.module.css';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export function UsersPage() {
  const { data, loading, error, refetch } = useFetch(USERS_URL);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const users = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const companies = useMemo(
    () => [...new Set(users.map((user) => user.company?.name).filter(Boolean))].sort(),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return users.filter((user) => {
      const matchesName = user.name.toLowerCase().includes(normalizedSearch);
      const matchesCompany = !selectedCompany || user.company?.name === selectedCompany;
      return matchesName && matchesCompany;
    });
  }, [users, debouncedSearch, selectedCompany]);

  const clearSearch = () => {
    setSearch('');
    setSelectedCompany('');
  };

  return (
    <main className={styles.usersPage}>
      <Container>
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>GEARRENT COMMUNITY</p>
          <h1>Users</h1>
          <p className={styles.intro}>Browse community members and find users by name or company.</p>
        </header>

        <section className={styles.controls} aria-label="Filter users">
          <div className={styles.control}>
            <label htmlFor="user-search">Search by name</label>
            <input
              id="user-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Enter a user name"
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="company-filter">Company</label>
            <select
              id="company-filter"
              value={selectedCompany}
              onChange={(event) => setSelectedCompany(event.target.value)}
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <button
            className={styles.clearButton}
            type="button"
            onClick={clearSearch}
            disabled={!search && !selectedCompany}
          >
            Clear Search
          </button>
        </section>

        {loading ? (
          <p className={styles.status} role="status">Users loading...</p>
        ) : error ? (
          <div className={styles.errorState} role="alert">
            <p>We couldn’t load users. {error.message}</p>
            <button className={styles.retryButton} type="button" onClick={refetch}>
              Retry Request
            </button>
          </div>
        ) : (
          <section className={styles.results} aria-live="polite">
            <p className={styles.resultCount}>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </p>
            {filteredUsers.length > 0 ? (
              <UserList users={filteredUsers} />
            ) : (
              <p className={styles.status}>Users not found</p>
            )}
          </section>
        )}
      </Container>
    </main>
  );
}