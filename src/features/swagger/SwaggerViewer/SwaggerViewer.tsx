'use client';

import { useAppStore } from '@/store/app-store';
import { OpenAPIV3 } from 'openapi-types';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import SwaggerViewerBody from './SwaggerViewerBody';
import SwaggerViewerHeader from './SwaggerViewerHeader';
import extractViewerData from './extractViewerData';

const SwaggerViewer = () => {
  const [searchTerm, setApiSearchTerm] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const schema = useAppStore((state) => state.schema);

  const {
    title,
    version,
    servers = [],
    tags,
    endpointCount,
  } = extractViewerData(schema.parsedContent);

  const [activeServer, setActiveServer] = useState<string>(servers[0] ?? '');

  const prevServersRef = useRef<string[]>(servers);

  useEffect(() => {
    const serversChanged =
      servers.length !== prevServersRef.current.length ||
      servers.some((server, i) => server !== prevServersRef.current[i]);

    if (serversChanged) {
      prevServersRef.current = servers;
      setActiveServer(servers[0] ?? '');
    }
  }, [servers]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setApiSearchTerm(e.target.value);
  };

  const handleClearSearchField = () => {
    setApiSearchTerm('');
  };

  const handleActiveTag = (activeTag: string | null) => {
    setActiveTag(activeTag);
  };

  const handleActiveServer = (server: string) => {
    setActiveServer(server);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <SwaggerViewerHeader
        title={title}
        version={version}
        tags={tags}
        servers={servers}
        endpointCount={endpointCount}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearchField={handleClearSearchField}
        onSetActiveTag={handleActiveTag}
        activeTag={activeTag}
        onActiveServer={handleActiveServer}
        activeServer={activeServer}
      />

      <SwaggerViewerBody
        activeTag={activeTag}
        activeEndpoint={searchTerm}
        schema={schema.parsedContent as OpenAPIV3.Document}
        onClearSearchField={handleClearSearchField}
        onSetActiveTag={handleActiveTag}
        activeServer={activeServer}
      />
    </div>
  );
};

export default SwaggerViewer;
