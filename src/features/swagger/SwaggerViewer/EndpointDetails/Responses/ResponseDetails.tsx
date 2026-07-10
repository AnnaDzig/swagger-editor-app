import { ResponseDetailsProps } from '@/types/SwaggerViewer';
import Spoiler from './Spoiler';

const ResponseDetails = ({ operationResponses }: ResponseDetailsProps) => {
  if (!operationResponses || Object.keys(operationResponses).length === 0) {
    return null;
  }

  const entries = Object.entries(operationResponses);

  const [successCode, successResponse] = entries[0];

  if (!successResponse || '$ref' in successResponse) {
    return (
      <div className="p-3 text-xs text-[#8b949e]">
        Response is a reference and cannot be displayed without resolution.
      </div>
    );
  }

  const schema = successResponse?.content?.['application/json']?.schema;
  const example = successResponse?.content?.['application/json']?.example;
  const applicationType = successResponse?.content
    ? Object.keys(successResponse?.content).join().split('/')[1]
    : 'No type available';

  const contentSchema = schema
    ? JSON.stringify(schema, null, 2)
    : 'No schema available';

  const contentExample = example
    ? JSON.stringify(example, null, 2)
    : 'No example available';

  return (
    <Spoiler
      successCode={successCode}
      contentSchema={contentSchema}
      applicationType={applicationType}
      contentExample={contentExample}
    />
  );
};

export default ResponseDetails;
