import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentProps } from 'react';
import Result from '../../features/swagger/SwaggerViewer/EndpointDetails/Result/Result';

interface EditorMockProps {
  onCopy: () => void;
}

interface ToggleMockProps {
  onToggleOutput: (value: string) => void;
}

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultStatus',
  () => ({
    default: () => <div data-testid="status-mock" />,
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultEditor',
  () => ({
    default: ({ onCopy }: EditorMockProps) => (
      <button onClick={onCopy}>Copy</button>
    ),
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultHeaders',
  () => ({
    default: () => <div data-testid="headers-mock">Headers</div>,
  }),
);

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultToggleOutput',
  () => ({
    default: ({ onToggleOutput }: ToggleMockProps) => (
      <div>
        <button onClick={() => onToggleOutput('body')}>Show Editor</button>
        <button onClick={() => onToggleOutput('headers')}>Show Headers</button>
      </div>
    ),
  }),
);

const mockCopy = vi.fn();

vi.mock(
  '../../features/swagger/SwaggerViewer/hooks/useCopyToClipboard',
  () => ({
    useCopyToClipboard: () => [false, mockCopy],
  }),
);

type ResultProps = ComponentProps<typeof Result>;
type ApiResult = NonNullable<ResultProps['result']>;

describe('Result', () => {
  const mockResult: ApiResult = {
    status: 200,
    headers: { 'content-type': 'application/json' },
    analytics: { duration: 150 },
    data: { id: 1 },
  };

  it('should return null if no result', () => {
    render(<Result result={undefined} appType="swagger" />);
    expect(screen.queryByTestId('status-mock')).not.toBeInTheDocument();
  });

  it('should toggle between editor and headers', () => {
    render(
      <Result
        result={mockResult as unknown as ResultProps['result']}
        appType="swagger"
      />,
    );

    expect(screen.getByText('Copy')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Show Headers'));

    expect(screen.getByTestId('headers-mock')).toBeInTheDocument();
    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
  });

  it('should call copy with response data', () => {
    render(
      <Result
        result={mockResult as unknown as ResultProps['result']}
        appType="swagger"
      />,
    );

    fireEvent.click(screen.getByText('Copy'));

    expect(mockCopy).toHaveBeenCalledWith(
      JSON.stringify(mockResult.data, null, 2),
    );
  });
});
