import { NextResponse } from 'next/server';

// Mock database - In a real app, this would be your database
let eventsDatabase = [
  {
    id: 1,
    title: 'Tech Career Fair 2024',
    organizer: 'University Career Center',
    date: '2024-03-15',
    time: '10:00 AM - 4:00 PM',
    location: 'University Main Hall',
    type: 'Career Fair',
    description: 'Connect with over 50 tech companies looking to hire for internships and full-time positions. Bring your resume and dress professionally.',
    image: '/images/events/career-fair.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Resume Workshop',
    organizer: 'Career Development Office',
    date: '2024-03-05',
    time: '2:00 PM - 4:00 PM',
    location: 'Online (Zoom)',
    type: 'Workshop',
    description: 'Learn how to craft a standout resume that will get you noticed by recruiters. This workshop will cover formatting, content, and tailoring your resume for specific roles.',
    image: '/images/events/resume-workshop.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Interview Skills Masterclass',
    organizer: 'Career Development Office',
    date: '2024-03-10',
    time: '1:00 PM - 3:30 PM',
    location: 'Business Building, Room 305',
    type: 'Workshop',
    description: 'Prepare for technical and behavioral interviews with this comprehensive masterclass. Practice answering common questions and receive feedback from industry professionals.',
    image: '/images/events/interview-skills.jpg',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET - Fetch all events
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredEvents = eventsDatabase;
    
    // Filter by status if provided
    if (status) {
      filteredEvents = eventsDatabase.filter(event => event.status === status);
    }
    
    // Sort by date (newest first)
    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return NextResponse.json({
      success: true,
      data: filteredEvents,
      total: filteredEvents.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event (Admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'organizer', 'date', 'time', 'location', 'type', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Create new event
    const newEvent = {
      id: Math.max(...eventsDatabase.map(e => e.id), 0) + 1,
      ...body,
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    eventsDatabase.push(newEvent);
    
    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// PUT - Update event (Admin only)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    const eventIndex = eventsDatabase.findIndex(event => event.id === parseInt(id));
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Update event
    eventsDatabase[eventIndex] = {
      ...eventsDatabase[eventIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      data: eventsDatabase[eventIndex],
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE - Delete event (Admin only)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    const eventIndex = eventsDatabase.findIndex(event => event.id === parseInt(id));
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Remove event from database
    const deletedEvent = eventsDatabase.splice(eventIndex, 1)[0];
    
    return NextResponse.json({
      success: true,
      data: deletedEvent,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
