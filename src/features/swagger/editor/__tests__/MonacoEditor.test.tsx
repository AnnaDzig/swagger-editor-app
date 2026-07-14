import { render, screen } from '@testing-library/react';
import MonacoEditor from '../components/MonacoEditor';

vi.mock('@monaco-editor/react', () => ({
  default: ({
    value,
    onChange,
    onMount,
  }: {
    value: string;
    onChange: (v: string) => void;
    onMount: (editor: unknown) => void;
  }) => {
    onMount?.({
      getModel: () => ({ getLineCount: () => 10 }),
      onDidChangeModelContent: vi.fn(),
    });
    return (
      <textarea
        data-testid="monaco-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
  useMonaco: () => null,
}));

describe('MonacoEditor', () => {
  test('renders editor', () => {
    render(
      <MonacoEditor
        language="yaml"
        value="test"
        onChange={vi.fn()}
        onLineCountChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  test('calls onChange when value changes', async () => {
    const onChange = vi.fn();
    render(
      <MonacoEditor
        language="yaml"
        value=""
        onChange={onChange}
        onLineCountChange={vi.fn()}
      />,
    );
    const editor = screen.getByTestId('monaco-editor');
    editor.dispatchEvent(new Event('change'));
  });

  test('calls onLineCountChange on mount', () => {
    const onLineCountChange = vi.fn();
    render(
      <MonacoEditor
        language="yaml"
        value="line1\nline2"
        onChange={vi.fn()}
        onLineCountChange={onLineCountChange}
      />,
    );
    expect(onLineCountChange).toHaveBeenCalledWith(10);
  });
});
