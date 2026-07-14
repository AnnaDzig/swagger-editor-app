import { render, screen } from '@testing-library/react';
import ValidateStatus from '../components/ValidateStatus';

describe('ValidateStatus', () => {
  test('shows Valid when isValid is true', () => {
    render(<ValidateStatus isValid={true} />);

    expect(screen.getByText('Valid')).toBeInTheDocument();
  });

  test('shows Invalid when isValid is false', () => {
    render(<ValidateStatus isValid={false} />);

    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });
});
