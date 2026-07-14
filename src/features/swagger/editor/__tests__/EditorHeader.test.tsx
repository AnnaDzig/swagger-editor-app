import { TooltipProvider } from '@/components/ui/tooltip';
import { fireEvent, render, screen } from '@testing-library/react';
import EditorHeader, { HeaderProps } from '../components/EditorHeader';

vi.mock('../hooks/useOrientation', () => ({ default: () => true }));

const defaultProps = {
  lineCount: 312,
  format: 'yaml' as const,
  onFormatChange: vi.fn(),
  isValid: true,
  isAuthenticated: false,
  onSave: vi.fn(),
  savedSchemaId: null,
  savedSchemas: [],
  onSchemaSelect: vi.fn(),
};

type RenderEditorHeaderProps = Partial<HeaderProps>;

function renderHeader(customProps: RenderEditorHeaderProps = {}) {
  return render(
    <TooltipProvider>
      <EditorHeader {...defaultProps} {...customProps} />
    </TooltipProvider>,
  );
}

describe('EditorHeader', () => {
  afterEach(() => vi.clearAllMocks());

  test('renders YAML and JSON buttons', () => {
    renderHeader();
    expect(screen.getByText('YAML')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
  });

  test('calls onFormatChange with json when JSON clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByText('JSON'));
    expect(defaultProps.onFormatChange).toHaveBeenCalledWith('json');
  });

  test('calls onFormatChange with yaml when YAML clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByText('YAML'));
    expect(defaultProps.onFormatChange).toHaveBeenCalledWith('yaml');
  });

  test('shows line count', () => {
    renderHeader();
    expect(screen.getByText('312L')).toBeInTheDocument();
  });

  test('shows Invalid when isValid is false', () => {
    renderHeader({ isValid: false });
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });

  test('shows Valid when isValid is true', () => {
    renderHeader({ isValid: true });
    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  test('Save button is disabled when not authenticated', () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });

  test('Save button is enabled when authenticated and valid', () => {
    renderHeader({ isAuthenticated: true, isValid: true });
    expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
  });

  test('calls onSave when Save clicked and authenticated', () => {
    renderHeader({ isAuthenticated: true, isValid: true });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(defaultProps.onSave).toHaveBeenCalled();
  });

  test('shows Update button when savedSchemaId exists', () => {
    renderHeader({ isAuthenticated: true, savedSchemaId: '123' });
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  test('shows schema selector when authenticated', () => {
    renderHeader({
      isAuthenticated: true,
      savedSchemas: [
        {
          id: '1',
          name: 'My Schema',
          content: '',
          format: 'yaml',
          createdAt: 0,
          updatedAt: 0,
        },
      ],
    });

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('My Schema')).toBeInTheDocument();
  });

  test('hides schema selector when not authenticated', () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.queryByText('Select Schemas')).not.toBeInTheDocument();
  });
});
