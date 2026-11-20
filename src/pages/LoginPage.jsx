import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components/Container/Container';
import { useAuth } from '../context/useContexts';
import { currentUser } from '../data/mockData';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const destination = location.state?.from?.pathname || '/';

  if (isAuthenticated) return <Navigate to={destination} replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = email.split('@')[0].trim();
    if (!name) {
      setError('Enter a valid email address.');
      return;
    }

    login({ ...currentUser, name });
    navigate(destination, { replace: true });
  };

  return (
    <Container>
      <section className="auth-card">
        <h1>Sign in</h1>
        <p className="page-intro">Demo sign-in for this coursework project. No server authentication is connected.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError('');
            }}
          />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" required minLength={4} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-action" type="submit">Continue</button>
        </form>
        <p className="page-intro">
          New to DriveSelect? <Link className="text-link" to="/register">Create an account</Link>
        </p>
        <Link className="text-link" to="/">Back to fleet</Link>
      </section>
    </Container>
  );
}
