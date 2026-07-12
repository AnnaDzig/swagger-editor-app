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

  const parsedEndpointPath =
    endpointPath.split('/').slice(0, -1).join('/') + '/';

  console.log('endpointPath: ', parsedEndpointPath);

  const requestUrl = `${activeServer}${parsedEndpointPath}${queryString ? queryString : ''}`;
  console.log('requestUrl: ', parsedEndpointPath);
  return { requestUrl };
};

export default buildRequestUrl;
