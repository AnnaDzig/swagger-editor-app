import { OpenAPIV3 } from 'openapi-types';
import { ChangeEvent } from 'react';

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

export type Operations = Array<{
  method: string;
  path: string;
  operation: {
    summary?: string;
    tags?: Array<string | OpenAPIV3.TagObject>;
  };
}>;
