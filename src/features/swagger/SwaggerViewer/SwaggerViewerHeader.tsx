'use client';

import { SwaggerViewerHeaderProps } from '@/types/SwaggerViewer';
import { Search, Server, X } from 'lucide-react';
import { useState } from 'react';

const SwaggerViewerHeader = ({
  title,
  version,
  servers = [],
  tags = [],
  endpointCount,
  onSearch,
  searchTerm,
  onClearSearchField,
  onSetActiveTag,
  activeTag,
}: SwaggerViewerHeaderProps) => {
  const [activeServer, setActiveServer] = useState(servers[0] ?? '');

  return (
    <div className="shrink-0 border-b px-4 py-3 bg-[#0b0e14] border-[#30363d]">
      <div className="flex items-center gap-3 mb-2.5 border-[#30363d]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[0px]">Swagger Viewer</p>
            <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
              {title && `${title}`}
            </h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded border font-mono shrink-0 text-[#6366f1] bg-[#6366f10e] border-[#6366f128]">
              {version && `v${version}`}
            </span>
          </div>

          {tags.length > 0 && (
            <p className="text-[11px] mt-0.5 text-[#6e7681]">
              {endpointCount ? `${endpointCount} endpoints` : null} -{' '}
              {`${tags.length} tags`}
            </p>
          )}
        </div>

        {servers.length > 0 && (
          <div className="flex items-center gap-1.5 shrink-0">
            <Server className="text-[#6e7681]" size={11} />
            <select
              name="select"
              title="select api"
              value={activeServer}
              onChange={(e) => setActiveServer(e.target.value)}
              className="text-xs rounded-md border px-2 py-1.5 focus:outline-none transition-colors bg-[#161b22] border-[#30363d] text-[#e6edf3]"
            >
              {servers.map((server) => (
                <option key={server} value={server}>
                  {server}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0 px-3 py-1.5 rounded-md border bg-[#161b22] border-[#30363d]">
          <Search size={11} style={{ color: '#6e7681' }} />
          <input
            value={searchTerm}
            onChange={onSearch}
            placeholder="Search endpoints…"
            className="flex-1 text-xs bg-transparent focus:outline-none placeholder:text-[#3d444d] text-[#e6edf3]"
          />
          {searchTerm && (
            <button
              className="text-[#6e7681]"
              type="button"
              title="search button"
              onClick={onClearSearchField}
            >
              <X size={11} />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            {tags.map((apiTag) => {
              return (
                <button
                  key={apiTag}
                  className={`text-xs px-2.5 py-1.5 rounded-md border transition-all duration-150 ${activeTag === apiTag ? `bg-[#6366f110] border-[#6366f138] text-[#818cf8]` : `bg-transparent border-[#30363d] text-[#6e7681]`}`}
                  onClick={() =>
                    onSetActiveTag(activeTag === apiTag ? null : apiTag)
                  }
                >
                  {apiTag}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwaggerViewerHeader;
