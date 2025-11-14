'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import styles from './interviews.module.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast } from 'react-toastify';

const localizer = momentLocalizer(moment);

export default function InterviewScheduling() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    candidate: '',
    date: '',
    time: '',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    notes: ''
  });
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', position: 'Software Engineer' },
    { id: 2, name: 'Maria Garcia', email: 'maria.g@example.com', position: 'UX Designer' },
    { id: 3, name: 'David Chen', email: 'david.chen@example.com', position: 'Data Analyst' },
  ]);

  useEffect(() => {
    // In a real app, fetch interviews from your API
    const mockInterviews = [
      {
        id: 1,
        title: 'Interview with IT Department',
        start: new Date(2025, 10, 3, 10, 0),
        end: new Date(2025, 10, 3, 11, 0),
        candidate: 'IT Department',
        type: 'video',
        status: 'scheduled',
        notes: 'IT Department interview'
      },
      {
        id: 2,
        title: 'Interview with Maria Garcia',
        start: new Date(2025, 10, 4, 14, 0),
        end: new Date(2025, 10, 4, 15, 0),
        candidate: 'Maria Garcia',
        type: 'in-person',
        status: 'scheduled',
        notes: 'UI/UX Designer - Portfolio review'
      },
    ];
    setEvents(mockInterviews);
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setFormData({
      ...formData,
      date: slotInfo.start.toISOString().split('T')[0],
      time: slotInfo.start.toTimeString().slice(0, 5)
    });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      candidate: event.candidate,
      date: event.start.toISOString().split('T')[0],
      time: event.start.toTimeString().slice(0, 5),
      duration: Math.round((event.end - event.start) / (1000 * 60)),
      type: event.type,
      status: event.status,
      notes: event.notes || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, save to your API
    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title: formData.title,
      start: new Date(`${formData.date}T${formData.time}`),
      end: new Date(new Date(`${formData.date}T${formData.time}`).getTime() + formData.duration * 60000),
      candidate: formData.candidate,
      type: formData.type,
      status: formData.status,
      notes: formData.notes
    };

    if (selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? newEvent : event));
      toast.success('Interview updated successfully');
    } else {
      setEvents([...events, newEvent]);
      toast.success('Interview scheduled successfully');
    }

    setShowModal(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      candidate: '',
      date: '',
      time: '',
      duration: 60,
      type: 'video',
      status: 'scheduled',
      notes: ''
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
      toast.success('Interview deleted successfully');
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    switch (event.status) {
      case 'scheduled':
        backgroundColor = '#3174ad';
        break;
      case 'completed':
        backgroundColor = '#5cb85c';
        break;
      case 'cancelled':
        backgroundColor = '#d9534f';
        break;
      default:
        backgroundColor = '#3174ad';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '0.8em',
        padding: '2px 5px'
      }
    };
  };

  return (
    <DashboardLayout userType="employer">
      <div className={styles.container}>
        <h1 className={styles.title}>Interview Scheduling</h1>
        
        <div className={styles.controls}>
          <button 
            className={styles.newButton}
            onClick={() => {
              setSelectedEvent(null);
              setFormData({
                title: '',
                candidate: '',
                date: '',
                time: '',
                duration: 60,
                type: 'video',
                status: 'scheduled',
                notes: ''
              });
              setShowModal(true);
            }}
          >
            Schedule New Interview
          </button>
        </div>

        <div className={styles.calendarContainer}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            defaultView="week"
            views={['month', 'week', 'day', 'agenda']}
            min={new Date(0, 0, 0, 8, 0, 0)} // 8 AM
            max={new Date(0, 0, 0, 20, 0, 0)} // 8 PM
          />
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>{selectedEvent ? 'Edit Interview' : 'Schedule New Interview'}</h2>
                <button 
                  className={styles.closeButton} 
                  onClick={() => {
                    setShowModal(false);
                    setSelectedEvent(null);
                  }}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="E.g., Technical Interview for Senior Developer"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Duration (minutes)</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="30">30 min</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    rows="3"
                    placeholder="Any additional notes or instructions..."
                  />
                </div>

                <div className={styles.formActions}>
                  {selectedEvent && (
                    <button 
                      type="button" 
                      className={styles.deleteButton}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                  <div>
                    <button 
                      type="button" 
                      className={styles.cancelButton}
                      onClick={() => {
                        setShowModal(false);
                        setSelectedEvent(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles.saveButton}>
                      {selectedEvent ? 'Update' : 'Schedule'} Interview
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
