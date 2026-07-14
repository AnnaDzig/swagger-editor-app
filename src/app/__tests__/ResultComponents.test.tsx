import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import ResultToggleOutput from '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultToggleOutput';
import ResultHeaders from '../../features/swagger/SwaggerViewer/EndpointDetails/Result/ResultHeaders';

describe('Result UI components', () => {
  it('ResultHeaders should render list of headers', () => {
    const headers = { 'Content-Type': 'application/json', 'X-Status': 'ok' };
    render(<ResultHeaders headers={headers} />);

    expect(screen.getByText('Content-Type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
    expect(screen.getByText('X-Status')).toBeInTheDocument();
  });

  it('ResultToggleOutput should call onToggleOutput on click', () => {
    const onToggle = vi.fn();
    render(
      <ResultToggleOutput onToggleOutput={onToggle} toggleData="editor" />,
    );

    fireEvent.click(screen.getByText('Response Headers'));
    expect(onToggle).toHaveBeenCalledWith('headers');
  });
});
