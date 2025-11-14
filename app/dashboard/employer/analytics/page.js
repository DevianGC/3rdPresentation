'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './analytics.module.css';

export default function EmployerAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedJob, setSelectedJob] = useState('all');

  const [analyticsData] = useState({
    overview: {
      totalViews: 2847,
      totalApplications: 156,
      conversionRate: 5.5,
      avgTimeToHire: 18
    },
    jobPerformance: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        views: 1245,
        applications: 45,
        conversionRate: 3.6,
        status: 'Active'
      },
      {
        id: 2,
        title: 'UX Designer',
        views: 892,
        applications: 32,
        conversionRate: 3.6,
        status: 'Active'
      },
      {
        id: 3,
        title: 'Marketing Intern',
        views: 456,
        applications: 28,
        conversionRate: 6.1,
        status: 'Active'
      },
      {
        id: 4,
        title: 'Data Analyst',
        views: 254,
        applications: 18,
        conversionRate: 7.1,
        status: 'Closed'
      }
    ],
    applicationTrends: [
      { period: 'Week 1', applications: 12, views: 234 },
      { period: 'Week 2', applications: 18, views: 345 },
      { period: 'Week 3', applications: 25, views: 456 },
      { period: 'Week 4', applications: 31, views: 523 }
    ],
    sourceBreakdown: [
      { source: 'Career Portal', applications: 89, percentage: 57 },
      { source: 'Direct Applications', applications: 34, percentage: 22 },
      { source: 'Referrals', applications: 21, percentage: 13 },
      { source: 'Social Media', applications: 12, percentage: 8 }
    ],
    hiringFunnel: [
      { stage: 'Applications', count: 156, percentage: 100 },
      { stage: 'Screening', count: 78, percentage: 50 },
      { stage: 'Interviews', count: 31, percentage: 20 },
      { stage: 'Final Round', count: 12, percentage: 8 },
      { stage: 'Offers', count: 5, percentage: 3 },
      { stage: 'Hired', count: 4, percentage: 2.6 }
    ]
  });

  const jobs = [
    { id: 'all', title: 'All Jobs' },
    { id: 1, title: 'Senior Software Engineer' },
    { id: 2, title: 'UX Designer' },
    { id: 3, title: 'Marketing Intern' },
    { id: 4, title: 'Data Analyst' }
  ];

  const getPerformanceColor = (rate) => {
    if (rate >= 6) return styles.performanceHigh;
    if (rate >= 4) return styles.performanceMedium;
    return styles.performanceLow;
  };

  const exportReport = () => {
    // Here you would typically generate and download a report
    console.log('Exporting analytics report...');
  };

  return (
    <DashboardLayout userType="employer">
      <div className={styles.analyticsContainer}>
        <div className={styles.analyticsHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Analytics & Reports</h1>
            <p className={styles.pageSubtitle}>Track your job posting performance and hiring metrics</p>
          </div>
          <div className={styles.headerActions}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={styles.periodSelect}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <button className={styles.exportButton} onClick={exportReport}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 10L8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 5L8 2L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className={styles.overviewGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{analyticsData.overview.totalViews.toLocaleString()}</h3>
              <p className={styles.statLabel}>Total Views</p>
              <span className={styles.statTrend}>+12% from last period</span>
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
              <h3 className={styles.statNumber}>{analyticsData.overview.totalApplications}</h3>
              <p className={styles.statLabel}>Total Applications</p>
              <span className={styles.statTrend}>+8% from last period</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{analyticsData.overview.conversionRate}%</h3>
              <p className={styles.statLabel}>Conversion Rate</p>
              <span className={styles.statTrend}>+0.3% from last period</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{analyticsData.overview.avgTimeToHire}</h3>
              <p className={styles.statLabel}>Avg. Days to Hire</p>
              <span className={styles.statTrend}>-2 days from last period</span>
            </div>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          {/* Job Performance Table */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Job Performance</h2>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className={styles.jobSelect}
              >
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.performanceTable}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Views</th>
                    <th>Applications</th>
                    <th>Conversion Rate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.jobPerformance.map(job => (
                    <tr key={job.id}>
                      <td className={styles.jobTitle}>{job.title}</td>
                      <td>{job.views.toLocaleString()}</td>
                      <td>{job.applications}</td>
                      <td>
                        <span className={`${styles.conversionRate} ${getPerformanceColor(job.conversionRate)}`}>
                          {job.conversionRate}%
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.jobStatus} ${job.status === 'Active' ? styles.statusActive : styles.statusClosed}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Application Trends Chart */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Application Trends</h2>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.trendChart}>
                {analyticsData.applicationTrends.map((data, index) => (
                  <div key={index} className={styles.trendBar}>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.applicationBar}
                        style={{ height: `${(data.applications / 35) * 100}%` }}
                      ></div>
                      <div 
                        className={styles.viewBar}
                        style={{ height: `${(data.views / 600) * 100}%` }}
                      ></div>
                    </div>
                    <span className={styles.barLabel}>{data.period}</span>
                  </div>
                ))}
              </div>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <div className={styles.legendColor} style={{ backgroundColor: 'var(--primary-color)' }}></div>
                  <span>Applications</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendColor} style={{ backgroundColor: 'var(--gray-400)' }}></div>
                  <span>Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomGrid}>
          {/* Application Sources */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Application Sources</h2>
            </div>
            <div className={styles.sourcesList}>
              {analyticsData.sourceBreakdown.map((source, index) => (
                <div key={index} className={styles.sourceItem}>
                  <div className={styles.sourceInfo}>
                    <span className={styles.sourceName}>{source.source}</span>
                    <span className={styles.sourceCount}>{source.applications} applications</span>
                  </div>
                  <div className={styles.sourceBar}>
                    <div 
                      className={styles.sourceProgress}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.sourcePercentage}>{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Funnel */}
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Hiring Funnel</h2>
            </div>
            <div className={styles.funnelContainer}>
              {analyticsData.hiringFunnel.map((stage, index) => (
                <div key={index} className={styles.funnelStage}>
                  <div className={styles.stageInfo}>
                    <span className={styles.stageName}>{stage.stage}</span>
                    <span className={styles.stageCount}>{stage.count}</span>
                  </div>
                  <div className={styles.funnelBar}>
                    <div 
                      className={styles.funnelProgress}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.stagePercentage}>{stage.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className={styles.insightsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Key Insights</h2>
          </div>
          <div className={styles.insightsList}>
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L13 8L19 9L14 14L16 20L10 17L4 20L6 14L1 9L7 8L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className={styles.insightContent}>
                <h4 className={styles.insightTitle}>High Performing Job</h4>
                <p className={styles.insightText}>Your "Data Analyst" position has the highest conversion rate at 7.1%</p>
              </div>
            </div>
            
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.insightContent}>
                <h4 className={styles.insightTitle}>Faster Hiring Process</h4>
                <p className={styles.insightText}>Your average time to hire has improved by 2 days compared to last period</p>
              </div>
            </div>
            
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.insightContent}>
                <h4 className={styles.insightTitle}>Strong Application Growth</h4>
                <p className={styles.insightText}>Applications have increased by 8% this period, showing growing interest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
