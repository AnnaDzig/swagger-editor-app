import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';

import * as isParamMod from '@/features/swagger/SwaggerViewer/isParameterObject';
import Parameters from '../../features/swagger/SwaggerViewer/EndpointDetails/Parameters';

vi.mock('../Span', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <span data-testid="span-mock">{children}</span>
  ),
}));

describe('Parameters', () => {
  it('should render nothing if no parameters', () => {
    render(<Parameters operationParameters={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render parameters correctly', () => {
    const mockParams = [
      {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'ID of user',
      },
    ];

    vi.spyOn(isParamMod, 'isParameterObject').mockReturnValue(true);

    type ParametersProps = ComponentProps<typeof Parameters>;

    render(
      <Parameters
        operationParameters={
          mockParams as unknown as ParametersProps['operationParameters']
        }
      />,
    );

    expect(screen.getByText('userId')).toBeInTheDocument();
    expect(screen.getByText('ID of user')).toBeInTheDocument();
    expect(screen.getByText('required')).toBeInTheDocument();
    expect(screen.getByText('path')).toBeInTheDocument();
  });
});
