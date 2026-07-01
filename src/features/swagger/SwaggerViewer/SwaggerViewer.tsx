'use client';

import { MOCK_SCHEMA } from '@/mocks/mockSchema';
import SwaggerViewerHeader from './SwaggerViewerHeader';
import extractViewerData from './extractViewerData';
import { useState, type ChangeEvent } from 'react';

const SwaggerViewer = () => {
  const [searchTerm, setApiSearchTerm] = useState('');

  const { title, version, servers, tags, endpointCount } =
    extractViewerData(MOCK_SCHEMA);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setApiSearchTerm(e.target.value);
  };

  const handleClearSearchField = () => {
    setApiSearchTerm('');
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
      />
    </div>
  );
};

export default SwaggerViewer;
