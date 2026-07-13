import { NextResponse } from 'next/server';

import { sessionRequestSchema } from '@/features/auth/schemas/session-schema';
import {
  SESSION_COOKIE_NAME,
  SESSION_EXPIRES_IN_MS,
  SESSION_MAX_AGE_SECONDS,
} from '@/features/auth/server/session-constants';
import { getAdminAuth } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

function createSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid session request.',
      },
      {
        status: 400,
      },
    );
  }

  const parsedRequest = sessionRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        error: 'Invalid session request.',
        details: parsedRequest.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const sessionCookie = await getAdminAuth().createSessionCookie(
      parsedRequest.data.idToken,
      {
        expiresIn: SESSION_EXPIRES_IN_MS,
      },
    );

    const response = NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );

    response.cookies.set(
      SESSION_COOKIE_NAME,
      sessionCookie,
      createSessionCookieOptions(),
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        error: 'Could not create authentication session.',
      },
      {
        status: 401,
      },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    },
  );

  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...createSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
