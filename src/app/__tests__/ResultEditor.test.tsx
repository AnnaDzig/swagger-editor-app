import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultEditor from '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultEditor';

vi.mock('@monaco-editor/react', () => ({
  Editor: () => <div data-testid="monaco" />,
}));

describe('ResultEditor', () => {
  const defaultProps = {
    appType: 'application/json',
    onCopy: vi.fn(),
    isCopied: false,
    onEditorWillMount: vi.fn(),
    responseBody: '{}',
    onMount: vi.fn(),
  };

  it('should show copy button and handle click', () => {
    const { rerender } = render(<ResultEditor {...defaultProps} />);

    const copyBtn = screen.getByRole('button');
    expect(screen.getByText('Copy')).toBeInTheDocument();

    fireEvent.click(copyBtn);
    expect(defaultProps.onCopy).toHaveBeenCalled();

    rerender(<ResultEditor {...defaultProps} isCopied={true} />);
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});
