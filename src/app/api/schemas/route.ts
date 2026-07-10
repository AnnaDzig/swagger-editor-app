import { NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/features/auth/server/get-authenticated-user';
import { createUserSchemaSchema } from '@/features/schemas/schemas-schema';
import {
  createUserSchema,
  getUserSchemas,
} from '@/features/schemas/server/schemas-repository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const schemas = await getUserSchemas(authenticatedUser.uid);

  return NextResponse.json({ schemas });
}

export async function POST(request: Request) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requestBody = await request.json();
  const parsedSchema = createUserSchemaSchema.safeParse(requestBody);

  if (!parsedSchema.success) {
    return NextResponse.json(
      {
        error: 'Invalid schema data.',
        details: parsedSchema.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const schema = await createUserSchema(
    authenticatedUser.uid,
    parsedSchema.data,
  );

  return NextResponse.json({ schema }, { status: 201 });
}
