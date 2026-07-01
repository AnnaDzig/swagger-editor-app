import type { OpenAPIV3 } from 'openapi-types';

const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
  'trace',
] as const;

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

export default extractViewerData;
