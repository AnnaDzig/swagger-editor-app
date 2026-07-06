import SwaggerViewerHeader from '@/features/swagger/SwaggerViewer/SwaggerViewerHeader';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SwaggerViewerHeader', () => {
  const defaultProps = {
    title: 'Test API',
    version: '1.0.0',
    servers: ['http://localhost:3000', 'https://api.test.com'],
    tags: ['users', 'posts'],
    endpointCount: 4,
    searchTerm: '',
    activeTag: null,
    onSearch: vi.fn(),
    onClearSearchField: vi.fn(),
    onSetActiveTag: vi.fn(),
    onActiveServer: vi.fn(),
    activeServer: 'http://localhost:3000',
  };

  it('renders title, version and endpoint info', () => {
    render(<SwaggerViewerHeader {...defaultProps} />);

    expect(screen.getByText('Test API')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('4 endpoints - 2 tags')).toBeInTheDocument();
  });

  it('renders all server options', () => {
    render(<SwaggerViewerHeader {...defaultProps} />);

    const select = screen.getByTitle('select api');

    expect(select).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'http://localhost:3000' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'https://api.test.com' }),
    ).toBeInTheDocument();
  });

  it('calls onSearch when typing', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SwaggerViewerHeader {...defaultProps} onSearch={onSearch} />);

    await user.type(screen.getByPlaceholderText('Search endpoints…'), 'get');

    expect(onSearch).toHaveBeenCalled();
  });

  it('shows clear button when searchTerm is not empty', () => {
    render(<SwaggerViewerHeader {...defaultProps} searchTerm="users" />);

    expect(screen.getByTitle('search button')).toBeInTheDocument();
  });

  it('calls onClearSearchField when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClearSearchField = vi.fn();

    render(
      <SwaggerViewerHeader
        {...defaultProps}
        searchTerm="users"
        onClearSearchField={onClearSearchField}
      />,
    );

    await user.click(screen.getByTitle('search button'));

    expect(onClearSearchField).toHaveBeenCalledTimes(1);
  });

  it('calls onSetActiveTag when tag is clicked', async () => {
    const user = userEvent.setup();
    const onSetActiveTag = vi.fn();

    render(
      <SwaggerViewerHeader {...defaultProps} onSetActiveTag={onSetActiveTag} />,
    );

    await user.click(screen.getByRole('button', { name: 'users' }));

    expect(onSetActiveTag).toHaveBeenCalledWith('users');
  });

  it('clears active tag when active tag is clicked again', async () => {
    const user = userEvent.setup();
    const onSetActiveTag = vi.fn();

    render(
      <SwaggerViewerHeader
        {...defaultProps}
        activeTag="users"
        onSetActiveTag={onSetActiveTag}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'users' }));

    expect(onSetActiveTag).toHaveBeenCalled();
  });

  it('does not render server selector when there are no servers', () => {
    render(<SwaggerViewerHeader {...defaultProps} servers={[]} />);

    expect(screen.queryByTitle('select api')).not.toBeInTheDocument();
  });

  it('does not render tag buttons when there are no tags', () => {
    render(<SwaggerViewerHeader {...defaultProps} tags={[]} />);

    expect(
      screen.queryByRole('button', { name: 'users' }),
    ).not.toBeInTheDocument();
  });

  it('calls onActiveServer when selecting another server', async () => {
    const user = userEvent.setup();

    const onActiveServer = vi.fn();

    render(
      <SwaggerViewerHeader {...defaultProps} onActiveServer={onActiveServer} />,
    );

    await user.selectOptions(
      screen.getByRole('combobox'),
      'https://api.test.com',
    );

    expect(onActiveServer).toHaveBeenCalledWith('https://api.test.com');
  });

  it('endpoints should not be in the document', () => {
    render(
      <SwaggerViewerHeader {...defaultProps} tags={[]} endpointCount={0} />,
    );

    const p = screen.queryByText('endpoints');

    expect(p).not.toBeInTheDocument();
  });

  it('should be 1 endpoint and 2 tags', () => {
    render(
      <SwaggerViewerHeader
        {...defaultProps}
        tags={['tag-1']}
        endpointCount={1}
      />,
    );

    const p = screen.getByText('1 endpoints - 1 tags');

    expect(p).toBeInTheDocument();
  });
});
