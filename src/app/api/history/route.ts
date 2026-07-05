import { NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/features/auth/server/get-authenticated-user';
import { getRequestHistory } from '@/features/history/server/history-repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const history = await getRequestHistory(authenticatedUser.uid);

  return NextResponse.json({ history });
}
