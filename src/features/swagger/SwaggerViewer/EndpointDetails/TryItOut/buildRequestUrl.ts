const buildRequestUrl = (
  activeServer: string,
  endpointPath: string,
  pathParameters: Record<string, string> = {},
  queryParameters: Record<string, string> = {},
) => {
  const parsedEndpointPath = endpointPath.replace(
    /\{([^}]+)\}/g,
    (_, parameterName) => pathParameters[parameterName] ?? `{${parameterName}}`,
  );

  const queryString = new URLSearchParams(
    Object.entries(queryParameters).filter(([, value]) => value.trim() !== ''),
  ).toString();

  const requestUrl =
    activeServer.replace(/\/$/, '') +
    '/' +
    parsedEndpointPath.replace(/^\//, '') +
    (queryString ? `?${queryString}` : '');

  return { requestUrl };
};

export default buildRequestUrl;
