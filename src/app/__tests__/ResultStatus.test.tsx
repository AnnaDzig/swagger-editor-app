import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultStatus from '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultStatus';

describe('ResultStatus', () => {
  it('should render status and duration correctly', () => {
    render(<ResultStatus status={200} duration={123} />);
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByText('- 123ms')).toBeInTheDocument();
  });

  it('should show "failed" for error status', () => {
    render(<ResultStatus status={500} duration={300} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('failed')).toBeInTheDocument();
  });

  it('should return nothing if status is 0', () => {
    const { container } = render(<ResultStatus status={0} duration={0} />);
    expect(container.firstChild).toBeNull();
  });
});
