import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container/Container';
import styles from './RegisterForm.module.css';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  age: '',
  country: '',
  gender: '',
  preferredVehicles: [],
  about: '',
};

const countries = ['Canada', 'Germany', 'Japan', 'United Kingdom', 'United States'];
const equipmentCategories = ['Gaming laptops', 'Monitors', 'Consoles', 'Peripherals', 'Streaming equipment'];

export function RegisterForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.title = 'Create Account | GearRent';
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => {
      if (type === 'checkbox' && name === 'preferredVehicles') {
        const preferredVehicles = checked
          ? [...currentData.preferredVehicles, value]
          : currentData.preferredVehicles.filter((vehicle) => vehicle !== value);
        return { ...currentData, preferredVehicles };
      }

      return { ...currentData, [name]: type === 'checkbox' ? checked : value };
    });

    setErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
    setSuccessMessage('');
    setSubmittedData(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.age || Number(formData.age) < 18) {
      nextErrors.age = 'You must be at least 18 years old.';
    }
    if (!formData.country) nextErrors.country = 'Please select a country.';
    if (!formData.gender) nextErrors.gender = 'Please select a gender.';
    if (formData.preferredVehicles.length === 0) {
      nextErrors.preferredVehicles = 'Please select at least one equipment category.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmittedData(null);
      setSuccessMessage('');
      return;
    }

    setSubmittedData({ ...formData, name: formData.name.trim(), email: formData.email.trim() });
    setSuccessMessage('Form submitted successfully.');
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmittedData(null);
    setSuccessMessage('');
  };

  const errorFor = (field) =>
    errors[field] && <span className={styles.error} id={`${field}-error`} role="alert">{errors[field]}</span>;

  return (
    <main className="page-shell">
      <Container>
        <section className={styles.registration}>
          <div className="page-heading">
            <p className="page-eyebrow">GEARRENT ACCOUNT</p>
            <h1>Create your account</h1>
            <p>Fill in your details to get started.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="register-name">Name</label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errorFor('name')}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errorFor('email')}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errorFor('password')}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-age">Age</label>
              <input
                id="register-age"
                name="age"
                type="number"
                min="18"
                value={formData.age}
                onChange={handleChange}
                aria-invalid={Boolean(errors.age)}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              {errorFor('age')}
            </div>

            <div className={styles.field}>
              <label htmlFor="register-country">Country</label>
              <select
                id="register-country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? 'country-error' : undefined}
              >
                <option value="">Select a country</option>
                {countries.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
              {errorFor('country')}
            </div>

            <fieldset className={styles.choiceGroup} aria-describedby={errors.gender ? 'gender-error' : undefined}>
              <legend>Gender</legend>
              <div className={styles.choices}>
                {['Female', 'Male', 'Prefer not to say'].map((gender) => (
                  <label className={styles.choice} key={gender}>
                    <input
                      name="gender"
                      type="radio"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                    />
                    {gender}
                  </label>
                ))}
              </div>
              {errorFor('gender')}
            </fieldset>

            <fieldset className={styles.choiceGroup} aria-describedby={errors.preferredVehicles ? 'preferredVehicles-error' : undefined}>
              <legend>Preferred Equipment Categories</legend>
              <div className={styles.choices}>
                {equipmentCategories.map((category) => (
                  <label className={styles.choice} key={category}>
                    <input
                      name="preferredVehicles"
                      type="checkbox"
                      value={category}
                      checked={formData.preferredVehicles.includes(category)}
                      onChange={handleChange}
                    />
                    {category}
                  </label>
                ))}
              </div>
              {errorFor('preferredVehicles')}
            </fieldset>

            <div className={styles.field}>
              <label htmlFor="register-about">About you</label>
              <textarea
                id="register-about"
                name="about"
                rows="4"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us what makes a great rental experience for you."
              />
            </div>

            <div className={styles.actions}>
              <button className="page-button" type="submit">Create account</button>
              <button className={styles.resetButton} type="button" onClick={handleReset}>Reset</button>
            </div>
            {successMessage && <p className={styles.success} role="status">{successMessage}</p>}
          </form>

          {submittedData && (
            <section className={styles.userData} aria-labelledby="submitted-user-title">
              <h2 id="submitted-user-title">User Data</h2>
              <dl>
                <dt>Name</dt><dd>{submittedData.name}</dd>
                <dt>Email</dt><dd>{submittedData.email}</dd>
                <dt>Password</dt><dd>{'\u2022'.repeat(submittedData.password.length)}</dd>
                <dt>Age</dt><dd>{submittedData.age}</dd>
                <dt>Country</dt><dd>{submittedData.country}</dd>
                <dt>Gender</dt><dd>{submittedData.gender}</dd>
                <dt>Preferred equipment categories</dt><dd>{submittedData.preferredVehicles.join(', ')}</dd>
                <dt>About</dt><dd>{submittedData.about || 'Not provided'}</dd>
              </dl>
              <button className="page-button" type="button" onClick={handleReset}>Clear form</button>
            </section>
          )}

          <p className={styles.loginPrompt}>Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </Container>
    </main>
  );
}
