import { Operations } from '@/types/SwaggerViewer';

export const groupByTag = (operations: Operations) => {
  const grouped: Record<string, Operations> = {};

  operations.forEach((operation) => {
    const tags = operation.operation.tags || ['untagged'];

    tags.forEach((tag) => {
      if (!grouped[tag]) {
        grouped[tag] = [];
      }

      grouped[tag].push(operation);
    });
  });

  return grouped;
};
