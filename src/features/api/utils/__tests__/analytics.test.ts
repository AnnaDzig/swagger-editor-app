import {
  getHeadersRecord,
  getPayloadSizeInBytes,
} from '@/features/api/utils/analytics';

describe('analytics utilities', () => {
  it('returns 0 for empty payload', () => {
    expect(getPayloadSizeInBytes(undefined)).toBe(0);
    expect(getPayloadSizeInBytes(null)).toBe(0);
  });

  it('calculates string payload size', () => {
    expect(getPayloadSizeInBytes('hello')).toBe(5);
  });

  it('calculates object payload size', () => {
    expect(getPayloadSizeInBytes({ ok: true })).toBe(
      new TextEncoder().encode(JSON.stringify({ ok: true })).length,
    );
  });

  it('converts Headers to plain object', () => {
    const headers = new Headers({
      'content-type': 'application/json',
    });

    expect(getHeadersRecord(headers)).toEqual({
      'content-type': 'application/json',
    });
  });
});
