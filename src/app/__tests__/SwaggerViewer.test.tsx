import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SwaggerViewer from '@/features/swagger/SwaggerViewer/SwaggerViewer';

import { vi } from 'vitest';

import extractViewerData from '@/features/swagger/SwaggerViewer/extractViewerData';

vi.mock('@/lib/firebase/client', () => ({
  firebaseAuth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(() => vi.fn()),
  },
  firestore: {},
}));

vi.mock('@/features/swagger/SwaggerViewer/extractViewerData', () => ({
  default: vi.fn(),
  getOperations: vi.fn(() => []),
}));

const mockedExtractViewerData = vi.mocked(extractViewerData);

describe('SwaggerViewer', () => {
  beforeEach(() => {
    mockedExtractViewerData.mockReturnValue({
      title: 'My API',
      version: '1.2.3',
      servers: ['http://localhost:3000', 'https://staging.petstore.com/v1'],
      tags: ['users', 'posts'],
      endpointCount: 5,
    });
  });

  it('renders header information', () => {
    render(<SwaggerViewer />);

    expect(screen.getByText('My API')).toBeInTheDocument();
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });

  it('renders when there are no servers', () => {
    mockedExtractViewerData.mockReturnValue({
      title: 'My API',
      version: '1.2.3',
      servers: [],
      tags: ['users', 'posts'],
      endpointCount: 5,
    });

    render(<SwaggerViewer />);

    expect(screen.queryByTitle('select api')).not.toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<SwaggerViewer />);

    expect(
      screen.getByPlaceholderText('Search endpoints…'),
    ).toBeInTheDocument();
  });

  it('updates search input while typing', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const input = screen.getByPlaceholderText('Search endpoints…');

    await user.type(input, 'users');

    expect(input).toHaveValue('users');
  });

  it('clears search input', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const input = screen.getByPlaceholderText('Search endpoints…');

    await user.type(input, 'users');

    await user.click(screen.getByTitle('search button'));

    expect(input).toHaveValue('');
  });

  it('selects tag', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const tag = screen.getByRole('button', { name: 'users' });

    await user.click(tag);

    expect(tag.className).toContain('bg-[#6366f110]');
  });

  it('unselects active tag', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const tag = screen.getByRole('button', { name: 'users' });

    await user.click(tag);
    await user.click(tag);

    expect(tag.className).not.toContain('bg-[#6366f110]');
  });

  it('changes active server', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const select = screen.getByTitle('select api');

    await user.selectOptions(select, 'https://staging.petstore.com/v1');

    expect(select).toHaveValue('https://staging.petstore.com/v1');
  });

  it('shows NoEndpoints when search has no matches', async () => {
    const user = userEvent.setup();

    render(<SwaggerViewer />);

    const input = screen.getByPlaceholderText('Search endpoints…');

    await user.type(input, 'abcdef');

    expect(screen.getByText(/No endpoints match/i)).toBeInTheDocument();
  });
});
