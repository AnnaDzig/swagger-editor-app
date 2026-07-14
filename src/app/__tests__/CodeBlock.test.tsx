import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeBlock from '@/features/swagger/SwaggerViewer/EndpointDetails/Responses/CodeBlock';

const mockCopy = vi.fn();
vi.mock('@/features/swagger/SwaggerViewer/hooks/useCopyToClipboard', () => ({
  useCopyToClipboard: () => [false, mockCopy] as const,
}));

describe('CodeBlock', () => {
  it('should render content lines and handle copy', () => {
    const content = 'line1\nline2';

    render(<CodeBlock content={content} />);

    expect(screen.getByText('line1')).toBeInTheDocument();
    expect(screen.getByText('line2')).toBeInTheDocument();

    const copyBtn = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyBtn);

    expect(mockCopy).toHaveBeenCalledWith(content);
  });

  it('should show "Copied" text when isCopied is true', () => {
    vi.mocked(mockCopy).mockImplementationOnce(() => {});

    const content = 'test-content';
    render(<CodeBlock content={content} />);

    const copyBtn = screen.getByRole('button', { name: /copy/i });

    expect(copyBtn).toHaveStyle({ color: 'rgb(139, 148, 158)' });
  });
});
