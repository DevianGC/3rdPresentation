'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './employer-dashboard.module.css';

export default function EmployerDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlistedCandidates: 0,
    scheduledInterviews: 0
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      candidateName: 'John Smith',
      position: 'Software Engineer',
      appliedDate: '2023-10-18',
      status: 'New Application',
      experience: '2 years'
    },
    {
      id: 2,
      candidateName: 'Maria Garcia',
      position: 'UX Designer',
      appliedDate: '2023-10-17',
      status: 'Shortlisted',
      experience: '3 years'
    },
    {
      id: 3,
      candidateName: 'David Chen',
      position: 'Data Analyst',
      appliedDate: '2023-10-16',
      status: 'Interview Scheduled',
      experience: '1 year'
    },
    {
      id: 4,
      candidateName: 'Sarah Johnson',
      position: 'Marketing Specialist',
      appliedDate: '2023-10-15',
      status: 'Under Review',
      experience: '4 years'
    }
  ]);

  // Fetch jobs from Firebase
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      
      // Update stats based on fetched jobs
      const activeJobs = data.filter(job => job.status === 'Active');
      setStats(prev => ({
        ...prev,
        activeJobs: activeJobs.length
      }));
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeJobPostings = jobs.filter(job => job.status === 'Active').slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Application':
        return styles.statusNew;
      case 'Shortlisted':
        return styles.statusShortlisted;
      case 'Interview Scheduled':
        return styles.statusInterview;
      case 'Under Review':
        return styles.statusReview;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <DashboardLayout userType="employer">
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.pageTitle}>Employer Dashboard</h1>
          <p className={styles.pageSubtitle}>Manage your job postings and track applications</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                <rect x="8" y="3" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.activeJobs}</h3>
              <p className={styles.statLabel}>Active Job Postings</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.totalApplications}</h3>
              <p className={styles.statLabel}>Total Applications</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.shortlistedCandidates}</h3>
              <p className={styles.statLabel}>Shortlisted Candidates</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.scheduledInterviews}</h3>
              <p className={styles.statLabel}>Scheduled Interviews</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Recent Applications */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Applications</h2>
              <button className={styles.viewAllButton}>View All</button>
            </div>
            <div className={styles.cardContent}>
              {recentApplications.map((application) => (
                <div key={application.id} className={styles.applicationItem}>
                  <div className={styles.applicationInfo}>
                    <h4 className={styles.candidateName}>{application.candidateName}</h4>
                    <p className={styles.positionTitle}>{application.position}</p>
                    <p className={styles.applicationDate}>Applied: {application.appliedDate}</p>
                  </div>
                  <div className={styles.applicationMeta}>
                    <span className={styles.experience}>{application.experience} exp.</span>
                    <span className={`${styles.applicationStatus} ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Job Postings */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Active Job Postings</h2>
              <button className={styles.viewAllButton}>Manage All</button>
            </div>
            <div className={styles.cardContent}>
              {activeJobPostings.map((job) => (
                <div key={job.id} className={styles.jobItem}>
                  <div className={styles.jobInfo}>
                    <h4 className={styles.jobTitle}>{job.title}</h4>
                    <p className={styles.jobDepartment}>{job.department}</p>
                    <p className={styles.jobPosted}>Posted: {job.posted}</p>
                  </div>
                  <div className={styles.jobMeta}>
                    <span className={styles.applicantCount}>{job.applicants} applicants</span>
                    <span className={styles.jobStatus}>{job.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
