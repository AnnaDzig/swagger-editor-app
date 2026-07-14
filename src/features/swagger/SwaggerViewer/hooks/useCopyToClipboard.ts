import { useState, useCallback } from 'react';

export function useCopyToClipboard(resetTimeout = 1800) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetTimeout);
      });
    },
    [resetTimeout],
  );

  return [isCopied, copy] as const;
}
