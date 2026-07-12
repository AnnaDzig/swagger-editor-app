import { OpenAPIV3 } from 'openapi-types';
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

export type method =
  'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

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
  activeServer: string;
}

export interface Parameter {
  name: string;
  in: string;
  required: boolean;
  description: string;
  schema: OpenAPIV3.Document[];
}

export type Operation = {
  method: method;
  path: string;
  operation: OpenAPIV3.OperationObject;
};

export type Operations = Operation[];

export interface EndpointDetailsProps {
  operation: OpenAPIV3.OperationObject;
  method: method;
  activeServer: string;
  endpointPath: string;
}

export interface ParametersProps {
  operationParameters:
    (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] | undefined;
}

export interface TryItOutContentProps {
  title: string;
  parameters:
    | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ReferenceObject;
  body?: string;
  onRequestBody?: (value: string) => void;
  query?: Record<string, string>;
  onQueryParameters?: Dispatch<SetStateAction<Record<string, string>>>;
}

export interface TryItOutItemProps {
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
  onQueryParameters?: Dispatch<SetStateAction<Record<string, string>>>;
  query?: Record<string, string>;
}

export interface TryItOutProps {
  parameters?: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
  request?: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject;
  responses?: OpenAPIV3.ResponsesObject;
  method: method;
  activeServer: string;
  endpointPath: string;
  onResultExecute: (result: unknown) => void;
}

export interface RequestBodyProps {
  operationRequestBody:
    OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined;
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
  successFormat: string;
  contentSchema: string;
  applicationType: string;
  contentExample: string;
}

export interface UrlPathProps {
  method: method;
  activeServer: string;
  endpointPath: string;
  queryParameters: Record<string, string>;
}

export interface HeadersPops {
  onHeaders?: Dispatch<SetStateAction<Record<string, string>>>;
}

export interface ButtonsPops {
  activeServer: string;
  queryParameters: Record<string, string>;
  endpointPath: string;
  method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';
  headers: Record<string, string>;
  body: string;
  onResultExecute: (result: unknown) => void;
}
