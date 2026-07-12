const buildRequestUrl = (
  activeServer: string,
  endpointPath: string,
  queryParameters: Record<string, string>,
) => {
  const queryString = queryParameters
    ? new URLSearchParams(
        Object.entries(queryParameters).filter(([, value]) => value !== ''),
      ).toString()
    : '';

  const requestUrl = `${activeServer}${queryString ? queryString : ''}`;

  return { requestUrl };
};

export default buildRequestUrl;
