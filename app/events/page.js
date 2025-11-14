'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { eventsAPI, handleApiError, formatDate } from '../../lib/api';
import styles from './events.module.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsAPI.getAll({ status: 'active' });
        setEvents(data.data);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  return (
    <div className={styles.eventsPage}>
      {/* Hero Sech=tion */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Upcoming Events</h1>
            <p className={styles.heroSubtitle}>
              Stay informed about career fairs, workshops, and networking opportunities to advance your professional journey.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className="container">
          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading events...</p>
            </div>
          )}
          
          {error && (
            <div className={styles.errorState}>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
          
          {!loading && !error && events.length === 0 && (
            <div className={styles.emptyState}>
              <h3>No events available</h3>
              <p>Check back later for upcoming events and opportunities.</p>
            </div>
          )}
          
          {!loading && !error && events.length > 0 && (
            <div className={styles.eventsGrid}>
              {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventImageContainer}>
                  <div className={styles.eventImagePlaceholder}>
                    {event.title.charAt(0)}
                  </div>
                  <span className={`${styles.eventType} ${styles[`eventType${event.type.replace(/\s+/g, '')}`]}`}>
                    {event.type}
                  </span>
                </div>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <div className={styles.eventInfo}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventInfoIcon}>📅</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className={styles.eventTime}>
                      <span className={styles.eventInfoIcon}>🕒</span>
                      <span>{event.time}</span>
                    </div>
                    <div className={styles.eventLocation}>
                      <span className={styles.eventInfoIcon}>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className={styles.eventDescription}>
                    {event.description.length > 120 
                      ? `${event.description.substring(0, 120)}...` 
                      : event.description}
                  </div>
                  <div className={styles.eventActions}>
                    <Link href={`/events/${event.id}`} className={`btn btn-primary ${styles.detailsButton}`}>
                      View Details
                    </Link>
                    <Link href={`/events/${event.id}/register`} className={`btn btn-secondary ${styles.registerButton}`}>
                      Register
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Want to host an event?</h2>
            <Link href="/employer/register" className={`btn btn-primary ${styles.ctaButton}`}>
              Register as Employer
            </Link>
            <p className={styles.ctaText}>
              If you're an employer or organization interested in hosting an event with our career center, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}