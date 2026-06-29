import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders Swagger workspace', () => {
    render(<HomePage />);

    expect(screen.getByText('Swagger Editor')).toBeInTheDocument();
    expect(screen.getByText('Swagger Viewer')).toBeInTheDocument();
  });
});
