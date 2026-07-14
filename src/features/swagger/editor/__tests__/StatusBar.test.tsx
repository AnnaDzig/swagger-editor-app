import { render, screen } from '@testing-library/react';
import StatusBar from '../components/StatusBar';

describe('StatusBar', () => {
  test('displays version and format', () => {
    render(<StatusBar version="3.0.0" format="yaml" />);

    expect(screen.getByText('3.0.0')).toBeInTheDocument();
    expect(screen.getByText('YAML')).toBeInTheDocument();
    expect(screen.getByText('UTF-8')).toBeInTheDocument();
    expect(screen.getByText('Spaces: 2')).toBeInTheDocument();
  });

  test('shows Invalid when isValid is false', () => {
    render(<StatusBar version="3.0.0" format="json" />);

    expect(screen.getByText('JSON')).toBeInTheDocument();
  });
});
