import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import TryItOutContent from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/TryItOutContent';

interface MonacoEditorMockProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

vi.mock('@monaco-editor/react', () => ({
  Editor: ({ value, onChange }: MonacoEditorMockProps) => (
    <textarea
      data-testid="monaco-mock"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock(
  '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/TryItOutItem',
  () => ({
    default: () => <div data-testid="item-mock">Item</div>,
  }),
);

type TryItOutContentProps = ComponentProps<typeof TryItOutContent>;

describe('TryItOutContent', () => {
  it('should render TryItOutItem if parameters is an array', () => {
    render(
      <TryItOutContent
        title="Params"
        parameters={[] as unknown as TryItOutContentProps['parameters']}
      />,
    );

    expect(screen.getByTestId('item-mock')).toBeInTheDocument();
    expect(screen.getByText('Params')).toBeInTheDocument();
  });

  it('should render Editor if parameters is not an array (Request Body)', () => {
    const onRequestBody = vi.fn();

    render(
      <TryItOutContent
        title="Body"
        parameters={{} as unknown as TryItOutContentProps['parameters']}
        body='{"a":1}'
        onRequestBody={onRequestBody}
      />,
    );

    const editor = screen.getByTestId('monaco-mock');
    expect(editor).toHaveValue('{"a":1}');
  });
});
