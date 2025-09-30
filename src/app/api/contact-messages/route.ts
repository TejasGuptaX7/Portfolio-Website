import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema
const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name cannot exceed 60 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters').max(120, 'Email cannot exceed 120 characters').email('Invalid email format'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters')
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  try {
    const messages = await db.select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(50);

    return NextResponse.json({
      ok: true,
      data: messages
    }, { 
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Internal server error: ' + error
    }, { 
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Validate input
    const validation = contactMessageSchema.safeParse(requestBody);
    if (!validation.success) {
      return NextResponse.json({
        ok: false,
        error: validation.error.errors[0].message
      }, { 
        status: 400,
        headers: corsHeaders
      });
    }

    const { name, email, message } = validation.data;

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    // Insert new contact message
    const newMessage = await db.insert(contactMessages)
      .values(sanitizedData)
      .returning();

    return NextResponse.json({
      ok: true,
      data: newMessage[0]
    }, { 
      status: 201,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Internal server error: ' + error
    }, { 
      status: 500,
      headers: corsHeaders
    });
  }
}