import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Headers from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/Headers';

describe('Headers', () => {
  it('should update header name and call onHeaders', () => {
    const onHeadersMock = vi.fn();
    render(<Headers onHeaders={onHeadersMock} />);

    const [nameInput, valueInput] = screen.getAllByRole(
      'textbox',
    ) as HTMLInputElement[];

    fireEvent.change(nameInput, { target: { value: 'Authorization' } });

    expect(onHeadersMock).toHaveBeenCalled();

    fireEvent.change(valueInput, { target: { value: 'Bearer token' } });
    expect(onHeadersMock).toHaveBeenCalledTimes(2);
  });

  it('should change border color on focus and blur', () => {
    render(<Headers onHeaders={vi.fn()} />);
    const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

    fireEvent.focus(input);
    expect(input.style.borderColor).toBe('rgb(99, 102, 241)');

    fireEvent.blur(input);
    expect(input.style.borderColor).toBe('rgb(48, 54, 61)');
  });
});
