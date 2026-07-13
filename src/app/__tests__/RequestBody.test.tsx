import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';

import * as isSchemaMod from '@/features/swagger/SwaggerViewer/isSchemaObject';
import RequestBody from '../../features/swagger/SwaggerViewer/EndpointDetails/Request/RequestBody';

vi.mock('../../Span', () => ({
  default: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

vi.mock('../Responses/Spoiler', () => ({
  default: () => <div data-testid="spoiler" />,
}));

type RequestBodyType = ComponentProps<
  typeof RequestBody
>['operationRequestBody'];

describe('RequestBody', () => {
  it('should return null if body is empty', () => {
    const { container } = render(
      <RequestBody
        operationRequestBody={undefined as unknown as RequestBodyType}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render schema properties', () => {
    const mockBody = {
      description: 'Test body',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string', description: 'User name' },
              age: { type: 'number' },
            },
          },
        },
      },
    };

    vi.spyOn(isSchemaMod, 'isSchemaObject').mockReturnValue(true);

    render(
      <RequestBody
        operationRequestBody={mockBody as unknown as RequestBodyType}
      />,
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.getByText('required')).toBeInTheDocument();
    expect(screen.getByText('optional')).toBeInTheDocument();
  });
});
