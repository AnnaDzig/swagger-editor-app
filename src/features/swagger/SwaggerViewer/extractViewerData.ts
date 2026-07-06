import type { OpenAPIV3 } from 'openapi-types';

import { HTTP_METHODS } from './http-methods';

const extractViewerData = (schema: OpenAPIV3.Document) => {
  const title = schema.info.title;
  const version = schema.info.version;
  const servers = schema.servers?.map((server) => server.url);
  const tags = schema.tags?.map((tag) => tag.name);

  const endpointCount = Object.values(schema.paths).reduce(
    (count, pathItem) => {
      if (!pathItem) {
        return 0;
      }

      const methods = HTTP_METHODS.filter((method) => pathItem[method]);

      return count + methods.length;
    },
    0,
  );

  return {
    title,
    version,
    servers,
    tags,
    endpointCount,
  };
};

export function getOperations(schema: OpenAPIV3.Document) {
  return Object.entries(schema.paths).flatMap(([path, pathItem]) =>
    HTTP_METHODS.flatMap((method) => {
      if (!pathItem) {
        return [];
      }

      const operation = pathItem[method];

      return operation
        ? [
            {
              path,
              method,
              operation,
            },
          ]
        : [];
    }),
  );
}

export default extractViewerData;
