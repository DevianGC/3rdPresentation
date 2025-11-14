'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './applicants.module.css';

export default function EmployerApplicants() {
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [jobs] = useState([
    { id: 1, title: 'Senior Software Engineer' },
    { id: 2, title: 'UX Designer' },
    { id: 3, title: 'Marketing Intern' },
    { id: 4, title: 'Data Analyst' }
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      jobId: 1,
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2023-10-18',
      status: 'New Application',
      experience: '5 years',
      education: 'BS Computer Science',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      resume: 'john_smith_resume.pdf',
      coverLetter: 'Looking forward to contributing to your team with my 5 years of experience in full-stack development...',
      rating: null
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      jobId: 2,
      jobTitle: 'UX Designer',
      appliedDate: '2023-10-17',
      status: 'Shortlisted',
      experience: '3 years',
      education: 'BA Design',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      resume: 'maria_garcia_resume.pdf',
      coverLetter: 'I am passionate about creating user-centered designs that solve real problems...',
      rating: 4
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 345-6789',
      jobId: 1,
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2023-10-16',
      status: 'Interview Scheduled',
      experience: '4 years',
      education: 'MS Computer Science',
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
      resume: 'david_chen_resume.pdf',
      coverLetter: 'With my strong background in backend development and cloud technologies...',
      rating: 5
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 456-7890',
      jobId: 3,
      jobTitle: 'Marketing Intern',
      appliedDate: '2023-10-15',
      status: 'Under Review',
      experience: '1 year',
      education: 'BA Marketing (Current)',
      skills: ['Social Media', 'Content Creation', 'Analytics', 'Canva'],
      resume: 'sarah_johnson_resume.pdf',
      coverLetter: 'As a marketing student with hands-on experience in social media management...',
      rating: 3
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 567-8901',
      jobId: 2,
      jobTitle: 'UX Designer',
      appliedDate: '2023-10-14',
      status: 'Rejected',
      experience: '2 years',
      education: 'Certificate in UX Design',
      skills: ['Sketch', 'InVision', 'Wireframing'],
      resume: 'michael_brown_resume.pdf',
      coverLetter: 'I would love to bring my creative problem-solving skills to your design team...',
      rating: 2
    }
  ]);

  const filteredApplicants = applicants.filter(applicant => {
    const jobMatch = selectedJob === 'all' || applicant.jobId === parseInt(selectedJob);
    const statusMatch = selectedStatus === 'all' || applicant.status === selectedStatus;
    return jobMatch && statusMatch;
  });

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(prev => prev.map(applicant => 
      applicant.id === applicantId 
        ? { ...applicant, status: newStatus }
        : applicant
    ));
  };

  const handleRatingChange = (applicantId, rating) => {
    setApplicants(prev => prev.map(applicant => 
      applicant.id === applicantId 
        ? { ...applicant, rating: rating }
        : applicant
    ));
  };

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
      case 'Rejected':
        return styles.statusRejected;
      case 'Hired':
        return styles.statusHired;
      default:
        return styles.statusDefault;
    }
  };


  const renderStars = (rating, applicantId, interactive = false) => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`${styles.star} ${star <= (rating || 0) ? styles.starFilled : ''}`}
            onClick={interactive ? () => handleRatingChange(applicantId, star) : undefined}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout userType="employer">
      <div className={styles.applicantsContainer}>
        <div className={styles.applicantsHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Applicant Management</h1>
            <p className={styles.pageSubtitle}>Review and manage job applications</p>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Job:</label>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Statuses</option>
              <option value="New Application">New Application</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          <div className={styles.resultsCount}>
            {filteredApplicants.length} applicant{filteredApplicants.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Applicants List */}
        <div className={styles.applicantsList}>
          {filteredApplicants.map(applicant => (
            <div key={applicant.id} className={styles.applicantCard}>
              <div className={styles.applicantHeader}>
                <div className={styles.applicantInfo}>
                  <h3 className={styles.applicantName}>{applicant.name}</h3>
                  <p className={styles.applicantJob}>{applicant.jobTitle}</p>
                  <p className={styles.applicantDate}>Applied: {applicant.appliedDate}</p>
                </div>
                <div className={styles.applicantMeta}>
                  <span className={`${styles.applicantStatus} ${getStatusColor(applicant.status)}`}>
                    {applicant.status}
                  </span>
                  {renderStars(applicant.rating, applicant.id, true)}
                </div>
              </div>

              <div className={styles.applicantDetails}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Experience:</span>
                    <span className={styles.detailValue}>{applicant.experience}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Education:</span>
                    <span className={styles.detailValue}>{applicant.education}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>{applicant.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Phone:</span>
                    <span className={styles.detailValue}>{applicant.phone}</span>
                  </div>
                </div>

                <div className={styles.skillsContainer}>
                  <span className={styles.detailLabel}>Skills:</span>
                  <div className={styles.skillsList}>
                    {applicant.skills.map(skill => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.applicantActions}>
                <a 
                  href={`/api/resumes/${applicant.resume}`} 
                  download 
                  className={styles.resumeButton}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 10L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 5L8 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                   Resume
                </a>
                
                <div className={styles.statusActions}>
                  <select
                    value={applicant.status}
                    onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="New Application">New Application</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {filteredApplicants.length === 0 && (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 52C16 43.1634 23.1634 36 32 36C40.8366 36 48 43.1634 48 52" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h3>No applicants found</h3>
              <p>No applicants match your current filters.</p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
