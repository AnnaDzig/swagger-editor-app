'use client';

import { MOCK_SCHEMA } from '@/mocks/mockSchema';
import SwaggerViewerHeader from './SwaggerViewerHeader';
import extractViewerData from './extractViewerData';
import { useState, type ChangeEvent } from 'react';
import SwaggerViewerBody from './SwaggerViewerBody';

const SwaggerViewer = () => {
  const [searchTerm, setApiSearchTerm] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { title, version, servers, tags, endpointCount } =
    extractViewerData(MOCK_SCHEMA);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setApiSearchTerm(e.target.value);
  };

  const handleClearSearchField = () => {
    setApiSearchTerm('');
  };

  const handleActiveTag = (activeTag: string | null) => {
    setActiveTag(activeTag);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <SwaggerViewerHeader
        title={title}
        version={version}
        servers={servers}
        tags={tags}
        endpointCount={endpointCount}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearchField={handleClearSearchField}
        onSetActiveTag={handleActiveTag}
        activeTag={activeTag}
      />

      <SwaggerViewerBody
        tags={tags}
        activeTag={activeTag}
        activeEndpoint={searchTerm}
        schema={MOCK_SCHEMA}
        onClearSearchField={handleClearSearchField}
        onSetActiveTag={handleActiveTag}
      />
    </div>
  );
};

export default SwaggerViewer;
