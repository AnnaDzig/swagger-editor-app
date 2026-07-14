import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';

import * as proxyClient from '@/features/api/client/proxy-client';
import Buttons from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/Buttons';

type ButtonsProps = ComponentProps<typeof Buttons>;
type ProxyResponse = Awaited<
  ReturnType<typeof proxyClient.executeProxyRequest>
>;

vi.mock('@/features/api/client/proxy-client', () => ({
  executeProxyRequest: vi.fn(),
}));

describe('Buttons', () => {
  const mockProps: ButtonsProps = {
    activeServer: 'https://api.com',
    endpointPath: '/user/{id}',
    pathParameters: { id: '123' },
    queryParameters: {},

    method: 'POST' as ButtonsProps['method'],
    headers: {},
    body: '{"name":"test"}',
    onResultExecute: vi.fn(),
    onCopyCurl: vi.fn(),
    isCurlCopied: false,
  };

  it('should show alert if path parameters are missing', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Buttons
        {...mockProps}

        pathParameters={{} as unknown as ButtonsProps['pathParameters']}
      />,
    );

    fireEvent.click(screen.getByText('Try it out'));
    expect(alertMock).toHaveBeenCalledWith('Please fill all path parameters.');
  });

  it('should execute request and call onResultExecute', async () => {
    const mockResponse = {
      status: 200,
      data: { success: true },
      analytics: { duration: 100 },
    };

    vi.mocked(proxyClient.executeProxyRequest).mockResolvedValue(
      mockResponse as unknown as ProxyResponse,
    );

    render(<Buttons {...mockProps} />);

    fireEvent.click(screen.getByText('Try it out'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(proxyClient.executeProxyRequest).toHaveBeenCalled();
      expect(mockProps.onResultExecute).toHaveBeenCalledWith(mockResponse);
    });
  });

  it('should call onCopyCurl when Generate cURL is clicked', () => {
    render(<Buttons {...mockProps} />);
    fireEvent.click(screen.getByText('Generate cURL'));
    expect(mockProps.onCopyCurl).toHaveBeenCalled();
  });
});
