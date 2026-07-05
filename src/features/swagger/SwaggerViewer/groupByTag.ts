import { OpenAPIV3 } from 'openapi-types';

type Operations = Array<{
  method: string;
  path: string;
  operation: {
    summary?: string;
    tags?: Array<string | OpenAPIV3.TagObject>;
  };
}>;

export const groupByTag = (operations: Operations) => {
  const grouped: Record<string, Operations> = {};

  operations.forEach((operation) => {
    const tags = operation.operation.tags || ['untagged'];

    tags.forEach((tag) => {
      const tagName = typeof tag === 'string' ? tag : tag.name;

      if (!grouped[tagName]) {
        grouped[tagName] = [];
      }

      grouped[tagName].push(operation);
    });
  });

  return grouped;
};
