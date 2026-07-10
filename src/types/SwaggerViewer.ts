import { OpenAPIV3 } from 'openapi-types';
import { ChangeEvent, ReactNode } from 'react';

export interface SwaggerViewerHeaderProps {
  title: string;
  version: string;
  servers: string[] | undefined;
  tags: string[] | undefined;
  endpointCount: number;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  onClearSearchField: () => void;
  onSetActiveTag: (activeTag: string | null) => void;
  activeTag: string | null;
  onActiveServer: (server: string) => void;
  activeServer: string;
}

export interface SwaggerViewerBodyProps {
  activeTag: string | null;
  activeEndpoint: string;
  schema: OpenAPIV3.Document;
  onClearSearchField: () => void;
  onSetActiveTag: (activeTag: string | null) => void;
}

export interface Parameter {
  name: string;
  in: string;
  required: boolean;
  description: string;
  schema: OpenAPIV3.Document[];
}

export type Operation = {
  method: string;
  path: string;
  operation: OpenAPIV3.OperationObject;
};

export type Operations = Operation[];

export interface EndpointDetailsProps {
  operation: OpenAPIV3.OperationObject;
}

export interface ParametersProps {
  operationParameters:
    (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] | undefined;
}

export interface ResponseProps {
  operationResponses: OpenAPIV3.ResponsesObject;
}

export interface ResponseDetailsProps {
  operationResponses: OpenAPIV3.ResponsesObject;
}

export interface SpanProps {
  children: ReactNode;
  className?: string;
  fontSize?: string;
  color?: string;
  borderColor?: string;
  bg?: string;
}

export interface SectionProps {
  title: string;
  parameters?: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
}

export interface SpoilerProps {
  successCode: string;
  contentSchema: string;
  applicationType: string;
  contentExample: string;
}
