'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './matching.module.css';
import { MOCK_JOBS, MOCK_CANDIDATES, getScoreLabel, simulateApiDelay, getInitials } from './mockData';

export default function CandidateMatching() {
  const [selectedJob, setSelectedJob] = useState('');
  const [jobs, setJobs] = useState([]);
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterScore, setFilterScore] = useState(0);

  useEffect(() => {
    setJobs(MOCK_JOBS);
  }, []);

  useEffect(() => {
    if (selectedJob) {
      fetchMatchedCandidates(selectedJob);
    }
  }, [selectedJob]);

  const fetchMatchedCandidates = async (jobId) => {
    setLoading(true);
    await simulateApiDelay();
    // TODO: Replace with API call: const response = await fetch(`/api/matching/${jobId}`);
    setMatchedCandidates(MOCK_CANDIDATES);
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return styles.scoreExcellent;
    if (score >= 80) return styles.scoreGood;
    if (score >= 70) return styles.scoreFair;
    return styles.scorePoor;
  };

  const filteredCandidates = matchedCandidates.filter(c => c.matchScore >= filterScore);

  return (
    <DashboardLayout userType="employer">
      <div className={styles.matchingContainer}>
        <Header />
        <JobSelector jobs={jobs} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
        
        {loading && <LoadingState />}
        
        {!loading && selectedJob && matchedCandidates.length > 0 && (
          <>
            <FilterBar filterScore={filterScore} setFilterScore={setFilterScore} count={filteredCandidates.length} />
            <CandidatesGrid 
              candidates={filteredCandidates}
              getScoreColor={getScoreColor}
            />
          </>
        )}
        
        {!loading && !selectedJob && <EmptyState />}
        
      </div>
    </DashboardLayout>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.pageTitle}>AI Candidate Matching</h1>
        <p className={styles.pageSubtitle}>Find the best candidates using AI-powered matching and NLP analysis</p>
      </div>
      <div className={styles.aiIndicator}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        <span>AI-Powered</span>
      </div>
    </div>
  );
}

function JobSelector({ jobs, selectedJob, setSelectedJob }) {
  return (
    <div className={styles.selectionCard}>
      <div className={styles.selectionHeader}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="8" y="3" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <h2>Select Job Position</h2>
      </div>
      <select className={styles.jobSelect} value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
        <option value="">Choose a job position...</option>
        {jobs.map(job => (
          <option key={job.id} value={job.id}>{job.title} - {job.department}</option>
        ))}
      </select>
    </div>
  );
}

function LoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.spinner}></div>
      <p>AI is analyzing candidates...</p>
    </div>
  );
}

function FilterBar({ filterScore, setFilterScore, count }) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label>Minimum Match Score:</label>
        <input type="range" min="0" max="100" value={filterScore} onChange={(e) => setFilterScore(Number(e.target.value))} className={styles.scoreSlider} />
        <span className={styles.scoreValue}>{filterScore}%</span>
      </div>
      <div className={styles.resultCount}>{count} candidates found</div>
    </div>
  );
}

function CandidatesGrid({ candidates, getScoreColor }) {
  return (
    <div className={styles.candidatesGrid}>
      {candidates.map((candidate) => (
        <CandidateCard 
          key={candidate.id}
          candidate={candidate}
          getScoreColor={getScoreColor}
        />
      ))}
    </div>
  );
}

function CandidateCard({ candidate, getScoreColor }) {
  return (
    <div className={styles.candidateCard}>
      <MatchBadge score={candidate.matchScore} getScoreColor={getScoreColor} />
      <CandidateHeader candidate={candidate} />
      <AIInsights insights={candidate.aiInsights} />
      <SkillsSection skills={candidate.skills} />
      <StrengthsSection strengths={candidate.keyStrengths} />
      <QuickInfo candidate={candidate} />
      <CardActions candidate={candidate} />
    </div>
  );
}

function MatchBadge({ score, getScoreColor }) {
  return (
    <div className={`${styles.matchBadge} ${getScoreColor(score)}`}>
      <div className={styles.scoreCircle}>
        <svg className={styles.scoreRing} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="45" strokeDasharray={`${score * 2.827} 283`} />
        </svg>
        <span className={styles.scoreNumber}>{score}</span>
      </div>
      <span className={styles.scoreLabel}>{getScoreLabel(score)}</span>
    </div>
  );
}

function CandidateHeader({ candidate }) {
  return (
    <div className={styles.candidateHeader}>
      <div className={styles.avatar}>{getInitials(candidate.name)}</div>
      <div className={styles.candidateBasicInfo}>
        <h3 className={styles.candidateName}>{candidate.name}</h3>
        <p className={styles.currentRole}>{candidate.currentRole}</p>
        <p className={styles.location}>{candidate.location}</p>
      </div>
    </div>
  );
}

function AIInsights({ insights }) {
  const items = [
    { label: 'Skills', value: insights.skillMatch },
    { label: 'Experience', value: insights.experienceMatch },
    { label: 'Education', value: insights.educationMatch },
    { label: 'Culture Fit', value: insights.cultureFit }
  ];

  return (
    <div className={styles.aiInsights}>
      <h4 className={styles.insightsTitle}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        AI Match Breakdown
      </h4>
      <div className={styles.insightBars}>
        {items.map((item, i) => (
          <div key={i} className={styles.insightBar}>
            <span>{item.label}</span>
            <div className={styles.barContainer}>
              <div className={styles.barFill} style={{width: `${item.value}%`}}></div>
            </div>
            <span>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection({ skills }) {
  return (
    <div className={styles.skillsSection}>
      <h4 className={styles.sectionTitle}>Top Skills</h4>
      <div className={styles.skillTags}>
        {skills.slice(0, 4).map((skill, i) => (
          <span key={i} className={styles.skillTag}>{skill}</span>
        ))}
        {skills.length > 4 && <span className={styles.skillTag}>+{skills.length - 4} more</span>}
      </div>
    </div>
  );
}

function StrengthsSection({ strengths }) {
  return (
    <div className={styles.strengthsSection}>
      <h4 className={styles.sectionTitle}>Key Strengths</h4>
      <ul className={styles.strengthsList}>
        {strengths.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

function QuickInfo({ candidate }) {
  return (
    <div className={styles.quickInfo}>
      <div className={styles.infoItem}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/></svg><span>{candidate.experience}</span></div>
      <div className={styles.infoItem}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2"/></svg><span>{candidate.education}</span></div>
      <div className={styles.infoItem}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/></svg><span>{candidate.availability}</span></div>
      <div className={styles.infoItem}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/></svg><span>{candidate.salary}</span></div>
    </div>
  );
}

function CardActions({ candidate }) {
  const handleDownloadResume = () => {
    // In a real app, this would trigger a file download
    console.log('Downloading resume for:', candidate.name);
    // Example: window.open(candidate.resumeUrl, '_blank');
  };

  return (
    <div className={styles.cardActions}>
      <button className={styles.btnPrimary} onClick={handleDownloadResume}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Download Resume
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      <h3>Select a Job Position</h3>
      <p>Choose a job position above to see AI-matched candidates</p>
    </div>
  );
}

function CandidateDetailModal({ candidate, onClose, onShortlist, onContact }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Candidate Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalProfile}>
            <div className={styles.modalAvatar}>{getInitials(candidate.name)}</div>
            <div>
              <h3>{candidate.name}</h3>
              <p>{candidate.currentRole}</p>
              <p className={styles.contactInfo}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/></svg>{candidate.email}</p>
              <p className={styles.contactInfo}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/></svg>{candidate.phone}</p>
            </div>
          </div>
          <div className={styles.modalSection}>
            <h4>All Skills</h4>
            <div className={styles.skillTags}>
              {candidate.skills.map((skill, i) => <span key={i} className={styles.skillTag}>{skill}</span>)}
            </div>
          </div>
          <div className={styles.modalSection}>
            <h4>Key Strengths</h4>
            <ul className={styles.strengthsList}>
              {candidate.keyStrengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className={styles.modalSection}>
            <h4>Documents</h4>
            <div className={styles.documents}>
              <a href="#" className={styles.documentLink}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/></svg>{candidate.resume}</a>
              {candidate.portfolio && <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer" className={styles.documentLink}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/><polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/></svg>Portfolio Website</a>}
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.btnPrimary} onClick={() => onShortlist(candidate.id)}>Shortlist Candidate</button>
          <button className={styles.btnSecondary} onClick={() => onContact(candidate)}>Send Message</button>
        </div>
      </div>
    </div>
  );
}
