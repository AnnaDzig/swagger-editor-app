export function getPayloadSizeInBytes(payload: unknown) {
  if (payload === undefined || payload === null) {
    return 0;
  }

  if (typeof payload === 'string') {
    return new TextEncoder().encode(payload).length;
  }

  return new TextEncoder().encode(JSON.stringify(payload)).length;
}

export function getHeadersRecord(headers: Headers) {
  return Object.fromEntries(headers.entries());
}
