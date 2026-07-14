import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import * as isRespMod from '@/features/swagger/SwaggerViewer/isResponseObject';
import Responses from '../../features/swagger/SwaggerViewer/EndpointDetails/Responses/Responses';

vi.mock('../../Span', () => ({
  default: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

vi.mock('./ResponseDetails', () => ({ default: () => <div /> }));

type ResponsesPropType = ComponentProps<typeof Responses>['operationResponses'];

describe('Responses', () => {
  it('should render response status codes', () => {
    const mockResponses = {
      '200': { description: 'Success' },
      '404': { description: 'Not Found' },
    };

    vi.spyOn(isRespMod, 'isResponseObject').mockReturnValue(true);

    render(
      <Responses
        operationResponses={mockResponses as unknown as ResponsesPropType}
      />,
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('should ignore $ref responses', () => {
    const mockResponses = {
      '200': { $ref: '#/comp/1' },
    };

    vi.spyOn(isRespMod, 'isResponseObject').mockReturnValue(true);

    render(
      <Responses
        operationResponses={mockResponses as unknown as ResponsesPropType}
      />,
    );

    expect(screen.queryByText('200')).not.toBeInTheDocument();
  });
});
