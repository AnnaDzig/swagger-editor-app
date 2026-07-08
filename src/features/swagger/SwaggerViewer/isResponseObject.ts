import { OpenAPIV3 } from 'openapi-types';

export function isResponseObject(
  response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject,
): response is OpenAPIV3.ResponseObject {
  return !('$ref' in response);
}
