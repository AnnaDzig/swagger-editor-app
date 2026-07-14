import { OpenAPIV3 } from 'openapi-types';

export interface ResponsesData {
  applicationType: string;
  contentSchema: string;
  contentExample: string;
  appType: string;
  isReference?: boolean;
}

const getResponsesData = (
  operationResponses?: OpenAPIV3.ResponsesObject,
): ResponsesData | undefined => {
  if (!operationResponses || Object.keys(operationResponses).length === 0) {
    return undefined;
  }

  const entries = Object.entries(operationResponses);
  const [, successResponse] = entries[0];

  if (!successResponse || '$ref' in successResponse) {
    return {
      applicationType: '',
      contentSchema: '',
      contentExample: '',
      appType: '',
      isReference: true,
    };
  }

  const schema = successResponse.content?.['application/json']?.schema;
  const example = successResponse.content?.['application/json']?.example;

  const appType = successResponse.content
    ? Object.keys(successResponse.content)[0]
    : 'No type available';

  const applicationType = appType.split('/')[1] ?? appType;

  const contentSchema = schema
    ? JSON.stringify(schema, null, 2)
    : 'No schema available';

  const contentExample = example
    ? JSON.stringify(example, null, 2)
    : 'No example available';

  return {
    applicationType,
    contentSchema,
    contentExample,
    appType,
  };
};

export default getResponsesData;
