import { NextResponse } from 'next/server';
import { getAuthenticatedUserFromRequest } from '@/features/auth/server/get-authenticated-user';
import { updateUserSchemaSchema } from '@/features/schemas/schemas-schema';
import {
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '@/features/schemas/server/schemas-repository';

export const dynamic = 'force-dynamic';

type SchemaRouteContext = {
  params: Promise<{
    schemaId: string;
  }>;
};

export async function GET(request: Request, context: SchemaRouteContext) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { schemaId } = await context.params;
  const schema = await getUserSchema(authenticatedUser.uid, schemaId);

  if (!schema) {
    return NextResponse.json({ error: 'Schema not found.' }, { status: 404 });
  }

  return NextResponse.json({ schema });
}

export async function PUT(request: Request, context: SchemaRouteContext) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requestBody = await request.json();
  const parsedSchema = updateUserSchemaSchema.safeParse(requestBody);

  if (!parsedSchema.success) {
    return NextResponse.json(
      {
        error: 'Invalid schema data.',
        details: parsedSchema.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { schemaId } = await context.params;
  const schema = await updateUserSchema(
    authenticatedUser.uid,
    schemaId,
    parsedSchema.data,
  );

  if (!schema) {
    return NextResponse.json({ error: 'Schema not found.' }, { status: 404 });
  }

  return NextResponse.json({ schema });
}

export async function DELETE(request: Request, context: SchemaRouteContext) {
  const authenticatedUser = await getAuthenticatedUserFromRequest(request);

  if (!authenticatedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { schemaId } = await context.params;
  const wasDeleted = await deleteUserSchema(authenticatedUser.uid, schemaId);

  if (!wasDeleted) {
    return NextResponse.json({ error: 'Schema not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
