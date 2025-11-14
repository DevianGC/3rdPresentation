'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './communications.module.css';

export default function EmployerCommunications() {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Career Office',
      fromEmail: 'career@gc.edu',
      subject: 'New Job Posting Guidelines',
      preview: 'We have updated our job posting guidelines to better serve both employers and students...',
      content: 'Dear Employer,\n\nWe have updated our job posting guidelines to better serve both employers and students. Please review the new requirements:\n\n1. All job postings must include clear salary ranges\n2. Remote work options should be clearly specified\n3. Required qualifications vs preferred qualifications should be distinguished\n\nThank you for your cooperation.\n\nBest regards,\nCareer Services Team',
      date: '2023-10-18',
      time: '10:30 AM',
      read: false,
      type: 'announcement'
    },
    {
      id: 2,
      from: 'John Smith',
      fromEmail: 'john.smith@email.com',
      subject: 'Thank you for the interview opportunity',
      preview: 'I wanted to thank you for taking the time to interview me for the Software Engineer position...',
      content: 'Dear Hiring Manager,\n\nI wanted to thank you for taking the time to interview me for the Software Engineer position yesterday. I really enjoyed our conversation about the technical challenges your team is working on.\n\nI am very excited about the opportunity to contribute to your projects and would love to be part of your team. Please let me know if you need any additional information from me.\n\nLooking forward to hearing from you.\n\nBest regards,\nJohn Smith',
      date: '2023-10-17',
      time: '2:15 PM',
      read: true,
      type: 'candidate'
    },
    {
      id: 3,
      from: 'Career Office',
      fromEmail: 'career@gc.edu',
      subject: 'Upcoming Career Fair - October 25th',
      preview: 'We are excited to invite you to participate in our upcoming career fair on October 25th...',
      content: 'Dear Partner Employer,\n\nWe are excited to invite you to participate in our upcoming career fair on October 25th from 10 AM to 4 PM in the Student Center.\n\nThis is a great opportunity to:\n- Meet talented students and recent graduates\n- Promote your company brand\n- Conduct on-the-spot interviews\n- Network with other employers\n\nPlease confirm your participation by October 20th.\n\nBest regards,\nCareer Services Team',
      date: '2023-10-15',
      time: '9:00 AM',
      read: true,
      type: 'announcement'
    },
    {
      id: 4,
      from: 'Maria Garcia',
      fromEmail: 'maria.garcia@email.com',
      subject: 'Question about UX Designer position',
      preview: 'I have a question about the remote work policy for the UX Designer position...',
      content: 'Hello,\n\nI am very interested in the UX Designer position posted on your company page. I have a question about the remote work policy mentioned in the job description.\n\nWould it be possible to work remotely 2-3 days per week, or is it strictly on-site? I am currently located about an hour away and would like to understand the flexibility.\n\nThank you for your time.\n\nBest regards,\nMaria Garcia',
      date: '2023-10-14',
      time: '4:45 PM',
      read: false,
      type: 'candidate'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Application Received',
      message: 'David Chen applied for Senior Software Engineer position',
      date: '2023-10-18',
      time: '11:45 AM',
      read: false,
      type: 'application'
    },
    {
      id: 2,
      title: 'Interview Reminder',
      message: 'Scheduled interview with Sarah Johnson tomorrow at 2:00 PM',
      date: '2023-10-17',
      time: '5:00 PM',
      read: true,
      type: 'interview'
    },
    {
      id: 3,
      title: 'Job Posting Expiring Soon',
      message: 'Marketing Intern position expires in 3 days',
      date: '2023-10-16',
      time: '9:00 AM',
      read: true,
      type: 'job'
    },
    {
      id: 4,
      title: 'Application Status Update',
      message: 'Michael Brown\'s application status changed to Rejected',
      date: '2023-10-15',
      time: '3:30 PM',
      read: true,
      type: 'application'
    }
  ]);

  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const unreadMessages = messages.filter(msg => !msg.read).length;
  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
    }
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleComposeSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message
    console.log('Sending message:', composeData);
    setComposeData({ to: '', subject: '', message: '' });
    setShowComposeModal(false);
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L10.5 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H5.5L8 1Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      case 'candidate':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'application':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 6H10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 9H10" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      case 'interview':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 1V5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 1V5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      case 'job':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="5" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="5" y="2" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5V8L11 11" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  return (
    <DashboardLayout userType="employer">
      <div className={styles.communicationsContainer}>
        <div className={styles.communicationsHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Messages</h1>
            <p className={styles.pageSubtitle}>Manage messages and notifications</p>
          </div>
          <button 
            className={styles.composeButton}
            onClick={() => setShowComposeModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Compose Message
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'messages' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Messages ({unreadMessages})
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications ({unreadNotifications})
            </button>
          </div>
        </div>

        <div className={styles.contentContainer}>
          {activeTab === 'messages' && (
            <div className={styles.messagesLayout}>
              {/* Messages List */}
              <div className={styles.messagesList}>
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`${styles.messageItem} ${!message.read ? styles.unread : ''} ${selectedMessage?.id === message.id ? styles.selected : ''}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className={styles.messageIcon}>
                      {getMessageTypeIcon(message.type)}
                    </div>
                    <div className={styles.messageContent}>
                      <div className={styles.messageHeader}>
                        <span className={styles.messageFrom}>{message.from}</span>
                        <span className={styles.messageTime}>{message.time}</span>
                      </div>
                      <h4 className={styles.messageSubject}>{message.subject}</h4>
                      <p className={styles.messagePreview}>{message.preview}</p>
                    </div>
                    {!message.read && <div className={styles.unreadDot}></div>}
                  </div>
                ))}
              </div>

              {/* Message Detail */}
              <div className={styles.messageDetail}>
                {selectedMessage ? (
                  <div className={styles.messageDetailContent}>
                    <div className={styles.messageDetailHeader}>
                      <h2 className={styles.messageDetailSubject}>{selectedMessage.subject}</h2>
                      <div className={styles.messageDetailMeta}>
                        <span className={styles.messageDetailFrom}>From: {selectedMessage.from}</span>
                        <span className={styles.messageDetailDate}>{selectedMessage.date} at {selectedMessage.time}</span>
                      </div>
                    </div>
                    <div className={styles.messageDetailBody}>
                      <pre className={styles.messageText}>{selectedMessage.content}</pre>
                    </div>
                    <div className={styles.messageActions}>
                      <button className={styles.replyButton}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 8L7 4V7C11 7 14 9 14 13C13 11 11 10 7 10V13L3 8Z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Reply
                      </button>
                      <button className={styles.forwardButton}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 8L9 4V7C5 7 2 9 2 13C3 11 5 10 9 10V13L13 8Z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Forward
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.noMessageSelected}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 20L32 36L56 20" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <h3>Select a message to read</h3>
                    <p>Choose a message from the list to view its contents</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.notificationsList}>
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className={styles.notificationIcon}>
                    {getNotificationTypeIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <h4 className={styles.notificationTitle}>{notification.title}</h4>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <span className={styles.notificationTime}>{notification.date} at {notification.time}</span>
                  </div>
                  {!notification.read && <div className={styles.unreadDot}></div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compose Message Modal */}
        {showComposeModal && (
          <div className={styles.modalOverlay} onClick={() => setShowComposeModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Compose Message</h2>
                <button 
                  className={styles.modalClose}
                  onClick={() => setShowComposeModal(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleComposeSubmit} className={styles.composeForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>To:</label>
                  <select
                    value={composeData.to}
                    onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select recipient</option>
                    <option value="career@gc.edu">Career Office</option>
                    <option value="john.smith@email.com">John Smith</option>
                    <option value="maria.garcia@email.com">Maria Garcia</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Subject:</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message:</label>
                  <textarea
                    value={composeData.message}
                    onChange={(e) => setComposeData(prev => ({ ...prev, message: e.target.value }))}
                    className={styles.formTextarea}
                    rows="8"
                    required
                  />
                </div>
                
                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setShowComposeModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.sendButton}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2L7 9" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M14 2L10 14L7 9L2 6L14 2Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
