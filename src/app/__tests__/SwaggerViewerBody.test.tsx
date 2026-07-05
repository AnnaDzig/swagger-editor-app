import { render, screen } from '@testing-library/react';

import SwaggerViewerBody from '@/features/swagger/SwaggerViewer/SwaggerViewerBody';

import { MOCK_SCHEMA } from '@/mocks/mockSchema';
import { userEvent } from '@testing-library/user-event';

describe('SwaggerViewerBody', () => {
  vi.mock('@/features/swagger/SwaggerViewer/extractViewerData', () => ({
    getOperations: vi.fn(() => [
      {
        method: 'get',
        path: '/users/{id}',
        operation: {
          summary: 'Get user by ID',
          tags: ['users', 'posts'],
        },
      },
    ]),
  }));

  const defaultProps = {
    tags: ['users', 'posts'],
    activeTag: null,
    activeEndpoint: 'get',
    schema: MOCK_SCHEMA,
    onClearSearchField: vi.fn(),
    onSetActiveTag: vi.fn(),
  };

  it('renders all tags', () => {
    render(<SwaggerViewerBody {...defaultProps} />);

    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('posts')).toBeInTheDocument();
  });

  it('renders only active tag', () => {
    render(<SwaggerViewerBody {...defaultProps} activeTag={'users'} />);

    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.queryByText('posts')).not.toBeInTheDocument();
  });

  it('renders endpoint method and path', () => {
    render(<SwaggerViewerBody {...defaultProps} />);

    expect(screen.getAllByText('GET')).toHaveLength(2);
    expect(screen.getAllByText('/users/{id}').length).toBeGreaterThan(0);
  });

  it('renders endpoint summary', () => {
    render(<SwaggerViewerBody {...defaultProps} />);

    expect(screen.getAllByText('Get user by ID')).toHaveLength(2);
  });

  it('renders only active tag', () => {
    render(<SwaggerViewerBody {...defaultProps} activeTag="users" />);

    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.queryByText('posts')).not.toBeInTheDocument();
  });

  it('renders NoEndpoints when nothing matches', () => {
    render(<SwaggerViewerBody {...defaultProps} activeEndpoint="abcdef" />);

    expect(screen.getByText(/No endpoints match/i)).toBeInTheDocument();
  });

  it('calls clear filters callbacks', async () => {
    const user = userEvent.setup();

    const onClearSearchField = vi.fn();
    const onSetActiveTag = vi.fn();

    render(
      <SwaggerViewerBody
        {...defaultProps}
        activeEndpoint="abcdef"
        onClearSearchField={onClearSearchField}
        onSetActiveTag={onSetActiveTag}
      />,
    );

    await user.click(screen.getByRole('button', { name: /clear filters/i }));

    expect(onClearSearchField).toHaveBeenCalled();
    expect(onSetActiveTag).toHaveBeenCalledWith(null);
  });
});
