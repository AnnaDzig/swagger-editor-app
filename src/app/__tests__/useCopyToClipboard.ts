import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../../features/swagger/SwaggerViewer/hooks/useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should copy text and change state', async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      result.current[1]('hello world');
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    expect(result.current[0]).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(false);
  });

  it('should not copy if text is empty', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      result.current[1]('');
    });

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(false);
  });
});
