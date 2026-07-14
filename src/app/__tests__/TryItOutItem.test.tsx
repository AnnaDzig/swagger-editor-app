import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OpenAPIV3 } from 'openapi-types';
import TryItOutItem from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/TryItOutItem';

describe('TryItOutItem', () => {
  const mockParams: OpenAPIV3.ParameterObject[] = [
    {
      name: 'userId',
      in: 'query',
      description: 'The user ID',
      schema: { type: 'string' },
    },
  ];

  it('should render parameter inputs and handle changes', () => {
    const onQueryMock = vi.fn();
    render(
      <TryItOutItem
        parameters={mockParams}
        query={{ userId: 'old' }}
        onQueryParameters={onQueryMock}
      />,
    );

    const input = screen.getByPlaceholderText(
      'The user ID',
    ) as HTMLInputElement;
    expect(input.value).toBe('old');
    expect(screen.getByText('string')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'new-id' } });

    expect(onQueryMock).toHaveBeenCalled();
  });
});
