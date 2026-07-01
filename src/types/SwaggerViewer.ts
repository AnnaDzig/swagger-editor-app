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
}
