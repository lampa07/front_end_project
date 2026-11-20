import { Link } from 'react-router-dom';
import { Container } from '../components/Container/Container';

export function NotFoundPage() {
  return (
    <Container>
      <section className="status-card not-found">
        <p className="eyebrow">Error 404</p>
        <h1>We couldn’t find that page</h1>
        <p>The address may be incorrect, or the page may have moved.</p>
        <Link className="primary-action" to="/">Return to fleet</Link>
      </section>
    </Container>
  );
}
