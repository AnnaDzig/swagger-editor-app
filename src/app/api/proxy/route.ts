import { NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/features/auth/server/get-authenticated-user';
import { proxyRequestSchema } from '@/features/api/schemas/proxy-request-schema';
import {
  getHeadersRecord,
  getPayloadSizeInBytes,
} from '@/features/api/utils/analytics';
import { saveRequestHistory } from '@/features/history/server/history-repository';

export async function POST(request: Request) {
  const startedAt = performance.now();

  try {
    const authenticatedUser = await getAuthenticatedUserFromRequest(request);
    const rawBody: unknown = await request.json();

    const parsedRequest = proxyRequestSchema.safeParse(rawBody);

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          error: 'Invalid proxy request.',
          details: parsedRequest.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { endpointUrl, method, headers, body } = parsedRequest.data;

    const requestBody =
      body === undefined || method === 'GET' || method === 'HEAD'
        ? undefined
        : JSON.stringify(body);

    const response = await fetch(endpointUrl, {
      method,
      headers: {
        ...headers,
        ...(requestBody ? { 'content-type': 'application/json' } : {}),
      },
      body: requestBody,
      cache: 'no-store',
    });

    const responseText = await response.text();
    const duration = Math.round(performance.now() - startedAt);

    let data: unknown = responseText;

    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      data = responseText;
    }

    const analytics = {
      endpointUrl,
      method,
      status: response.status,
      duration,
      requestSize: getPayloadSizeInBytes(body),
      responseSize: getPayloadSizeInBytes(responseText),
      errorDetails: response.ok ? undefined : response.statusText,
      timestamp: Date.now(),
    };

    let historySaved = false;

    if (authenticatedUser) {
      try {
        await saveRequestHistory(authenticatedUser.uid, analytics);
        historySaved = true;
      } catch {
        historySaved = false;
      }
    }

    return NextResponse.json({
      data,
      status: response.status,
      headers: getHeadersRecord(response.headers),
      analytics,
      historySaved,
    });
  } catch (error) {
    const duration = Math.round(performance.now() - startedAt);

    return NextResponse.json(
      {
        error: 'Proxy request failed.',
        analytics: {
          status: 0,
          duration,
          requestSize: 0,
          responseSize: 0,
          errorDetails:
            error instanceof Error ? error.message : 'Unknown proxy error.',
          timestamp: Date.now(),
        },
      },
      { status: 502 },
    );
  }
}
