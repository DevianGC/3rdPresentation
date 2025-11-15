import { adminDb } from '../../../lib/firebaseAdmin';
import { z } from 'zod';

// Validation schema for job creation
const createJobSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  salary: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(1),
  requirements: z.union([z.string(), z.array(z.string())]).optional(),
  featured: z.boolean().optional(),
  status: z.enum(['Active', 'Closed', 'Draft']).optional(),
  posted: z.string().optional(),
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const cursor = searchParams.get('cursor');
    const status = searchParams.get('status');

    let query = adminDb.collection('jobs').orderBy('createdAt', 'desc');
    
    // Filter by status if provided
    if (status && ['Active', 'Closed', 'Draft'].includes(status)) {
      query = adminDb.collection('jobs').where('status', '==', status).orderBy('createdAt', 'desc');
    }
    
    // Apply cursor for pagination
    if (cursor) {
      const cursorDoc = await adminDb.collection('jobs').doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }
    
    const snapshot = await query.limit(limit + 1).get();
    const hasMore = snapshot.docs.length > limit;
    const jobs = snapshot.docs.slice(0, limit).map(d => ({ 
      id: d.id, 
      ...d.data() 
    }));
    
    const nextCursor = hasMore ? snapshot.docs[limit - 1].id : null;
    
    return new Response(JSON.stringify({ 
      jobs, 
      nextCursor, 
      hasMore 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = createJobSchema.parse(body);
    
    // Use Firestore auto-generated ID
    const docRef = adminDb.collection('jobs').doc();
    const now = new Date().toISOString();
    
    const newJob = {
      ...validatedData,
      status: validatedData.status || 'Draft',
      featured: validatedData.featured || false,
      posted: validatedData.posted || now.split('T')[0],
      applications: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    await docRef.set(newJob);
    
    return new Response(JSON.stringify({ id: docRef.id, ...newJob }), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify({ 
        error: 'Validation failed', 
        details: err.errors 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
