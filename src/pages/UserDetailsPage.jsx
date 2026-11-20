import { Link, useParams } from 'react-router-dom';
import { Container } from '../components/Container/Container';
import { useFetch } from '../hooks/useFetch';
import styles from './UserDetailsPage.module.css';

export function UserDetailsPage() {
  const { id } = useParams();
  const { data: user, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);

  return (
    <main className={styles.userDetailsPage}>
      <Container>
        <Link className={styles.backLink} to="/users">Back to Users</Link>

        {loading ? (
          <p className={styles.status} role="status">User loading...</p>
        ) : error ? (
          <div className={styles.errorState} role="alert">
            <p>We couldn’t load this user. {error.message}</p>
            <button className={styles.retryButton} type="button" onClick={refetch}>
              Retry Request
            </button>
          </div>
        ) : user ? (
          <>
            <section className={styles.profileCard} aria-labelledby="user-name">
              <p className={styles.eyebrow}>GEARRENT COMMUNITY</p>
              <h1 id="user-name">{user.name}</h1>
              <dl className={styles.userInfo}>
                <div><dt>Username</dt><dd>{user.username}</dd></div>
                <div><dt>Email</dt><dd><a href={`mailto:${user.email}`}>{user.email}</a></dd></div>
                <div><dt>Phone</dt><dd>{user.phone}</dd></div>
                <div><dt>Website</dt><dd><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></dd></div>
                <div><dt>Company</dt><dd>{user.company?.name}</dd></div>
                <div>
                  <dt>Address</dt>
                  <dd>
                    {user.address?.street}, {user.address?.suite}<br />
                    {user.address?.city}, {user.address?.zipcode}
                  </dd>
                </div>
              </dl>
            </section>

            <section className={styles.postsSection} aria-labelledby="user-posts-title">
              <h2 id="user-posts-title">User Posts</h2>
              {postsLoading ? (
                <p className={styles.status} role="status">Posts loading...</p>
              ) : postsError ? (
                <p className={styles.errorState} role="alert">
                  We couldn’t load this user’s posts. {postsError.message}
                </p>
              ) : posts?.length ? (
                <div className={styles.postsList}>
                  {posts.map((post) => (
                    <article className={styles.postCard} key={post.id}>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className={styles.status}>No posts found for this user.</p>
              )}
            </section>
          </>
        ) : (
          <p className={styles.status}>User not found.</p>
        )}
      </Container>
    </main>
  );
}