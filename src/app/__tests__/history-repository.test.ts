import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveRequestHistory,
  getRequestHistory,
  getRequestHistoryItem,
} from '@/features/history/server/history-repository';
import { getAdminDb } from '@/lib/firebase/admin';

type AdminDb = ReturnType<typeof getAdminDb>;

vi.mock('@/lib/firebase/admin', () => ({
  getAdminDb: vi.fn(),
}));

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: { serverTimestamp: vi.fn(() => 'mocked-timestamp') },
}));

describe('history-repository', () => {
  const mockDoc = {
    id: 'req-123',
    get: vi.fn(),
    data: vi.fn(),
    exists: true,
  };

  const mockCollection = {
    doc: vi.fn(() => mockDoc),
    add: vi.fn(() => Promise.resolve({ id: 'new-id' })),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    get: vi.fn(),
  };

  const mockDb = {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        collection: vi.fn(() => mockCollection),
      })),
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getAdminDb).mockReturnValue(mockDb as unknown as AdminDb);
  });

  it('saveRequestHistory должен сохранять данные в корректную коллекцию', async () => {
    const input = {
      method: 'POST',
      endpointUrl: 'https://api.com',
      status: 200,
      duration: 150,
      requestSize: 10,
      responseSize: 20,
      timestamp: 123456789,
    };

    const id = await saveRequestHistory('user-1', input);

    expect(id).toBe('new-id');
    expect(mockCollection.add).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.com',
        status: 200,
      }),
    );
  });

  it('getRequestHistory должен маппить документы и возвращать массив', async () => {
    const mockData = {
      method: 'GET',
      url: 'https://test.com',
      status: 200,
      duration: 50,
      timestamp: 12345,
    };

    mockCollection.get.mockResolvedValue({
      docs: [{ id: '1', data: () => mockData }],
    } as unknown as never);

    const result = await getRequestHistory('user-1');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: '1',
        method: 'GET',
        url: 'https://test.com',
      }),
    );
  });

  it('getRequestHistoryItem должен возвращать null, если документ не найден', async () => {
    mockDoc.get.mockResolvedValue({ exists: false } as unknown as never);

    const result = await getRequestHistoryItem('user-1', 'req-999');
    expect(result).toBeNull();
  });

  it('маппинг должен корректно обрабатывать отсутствующие поля', async () => {
    mockDoc.get.mockResolvedValue({
      exists: true,
      id: '2',
      data: () => ({ status: 'not-a-number' }),
    } as unknown as never);

    const result = await getRequestHistoryItem('user-1', '2');
    expect(result?.status).toBe(0); // Дефолтное значение из функции маппинга
  });
});
