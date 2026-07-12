import { TryItOutContentProps } from '@/types/SwaggerViewer';

export const getContentExample = (
  parameters: TryItOutContentProps['parameters'],
) => {
  if (Array.isArray(parameters)) {
    return '';
  }

  const content = Object.values(parameters)?.[1]?.['application/json'];

  const example = content?.example;

  return example ? JSON.stringify(example, null, 2) : 'No example available';
};
