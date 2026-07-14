interface CurlArgs {
  method: string;
  url: string;
  body?: string;
  headers?: Record<string, string>;
}

export const buildCurl = ({
  method,
  url,
  body,
  headers = {},
}: CurlArgs): string => {
  let curl = `curl -X ${method.toUpperCase()} "${url}"`;

  const allHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  Object.entries(allHeaders).forEach(([key, value]) => {
    curl += ` \\\n  -H "${key}: ${value}"`;
  });

  if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    const escapedBody = body.replace(/'/g, "'\\''");
    curl += ` \\\n  -d '${escapedBody}'`;
  }

  return curl;
};
