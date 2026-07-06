import { OpenAPIV3 } from 'openapi-types';

export const isParameterObject = (
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
): parameter is OpenAPIV3.ParameterObject => {
  return !('$ref' in parameter);
};
