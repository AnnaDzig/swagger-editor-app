import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UrlPath from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/UrlPath';

describe('UrlPath', () => {
  it('should correctly format URL with path and query parameters', () => {
    render(
      <UrlPath
        method="get"
        activeServer="https://api.com"
        endpointPath="/users/{id}/posts"
        pathParameters={{ id: '123' }}
        queryParameters={{ limit: '10', filter: ' ' }}
      />,
    );

    expect(screen.getByText('/users/123/posts?limit=10')).toBeInTheDocument();

    expect(screen.getByText('https://api.com')).toBeInTheDocument();
  });
});
