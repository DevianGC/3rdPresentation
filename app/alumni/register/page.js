'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../../lib/firebaseClient';
import Link from 'next/link';
import styles from './alumni-register.module.css';
import FormInput from '../../../components/UI/FormInput/FormInput';
import Button from '../../../components/UI/Button/Button';
import { getAuthConfig, getNavConfig, getValidationConfig } from '../../../utils/config';

export default function AlumniRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    graduationYear: '',
    major: '',
    company: '',
    position: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const validationConfig = getValidationConfig();

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validationConfig.email.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData.major.trim()) {
      newErrors.major = 'Major is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < validationConfig.passwordMinLength) {
      newErrors.password = `Password must be at least ${validationConfig.passwordMinLength} characters`;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // TODO: Save additional alumni data to database
      // (graduationYear, major, company, position)

      // Redirect to alumni dashboard
      window.location.href = '/dashboard/alumni';
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors({
          submit: 'This email is already registered. Please login instead.',
        });
      } else {
        setErrors({
          submit: 'Registration failed. Please try again.',
        });
      }
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1 className={styles.title}>Alumni Registration</h1>
            <p className={styles.subtitle}>Join our alumni network and stay connected</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.registerForm}>
          {errors.submit && (
            <div className={styles.errorMessage}>{errors.submit}</div>
          )}

          <div className={styles.formRow}>
            <FormInput
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="John"
              required
            />

            <FormInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Doe"
              required
            />
          </div>

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="your.email@example.com"
            required
          />

          <div className={styles.formRow}>
            <FormInput
              label="Graduation Year"
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              error={errors.graduationYear}
              placeholder="2020"
              required
            />

            <FormInput
              label="Major"
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              error={errors.major}
              placeholder="Computer Science"
              required
            />
          </div>

          <div className={styles.formRow}>
            <FormInput
              label="Current Company (Optional)"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Tech Corp"
            />

            <FormInput
              label="Position (Optional)"
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
          </div>

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            required
          />

          <Button type="submit" variant="primary" size="large" fullWidth>
            Create Alumni Account
          </Button>
        </form>

        <div className={styles.registerFooter}>
          <p>
            Already have an account?{' '}
            <Link href="/alumni/login">Login here</Link>
          </p>
          <Link href="/auth/register" className={styles.backLink}>
            ← Back to Role Selection
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
