import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name must be at most 60 characters'),
  message: z.string().min(1, 'Message must be at least 1 character').max(500, 'Message must be at most 500 characters'),
});

function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  return addCorsHeaders(response);
}

export async function GET(request: NextRequest) {
  try {
    const results = await db.select()
      .from(comments)
      .orderBy(desc(comments.createdAt))
      .limit(100);

    const response = NextResponse.json({
      ok: true,
      data: results
    }, { status: 200 });

    return addCorsHeaders(response);
  } catch (error) {
    console.error('GET error:', error);
    const response = NextResponse.json({
      ok: false,
      error: 'Internal server error: ' + error
    }, { status: 500 });

    return addCorsHeaders(response);
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Validate request body using Zod
    const validationResult = commentSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      
      const response = NextResponse.json({
        ok: false,
        error: errorMessage
      }, { status: 400 });

      return addCorsHeaders(response);
    }

    const { name, message } = validationResult.data;

    // Insert new comment
    const newComment = await db.insert(comments)
      .values({
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString()
      })
      .returning();

    const response = NextResponse.json({
      ok: true,
      data: newComment[0]
    }, { status: 201 });

    return addCorsHeaders(response);
  } catch (error) {
    console.error('POST error:', error);
    const response = NextResponse.json({
      ok: false,
      error: 'Internal server error: ' + error
    }, { status: 500 });

    return addCorsHeaders(response);
  }
}