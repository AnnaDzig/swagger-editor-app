import { Dispatch, SetStateAction, useState } from 'react';

import { Terminal } from 'lucide-react';

import TryItOutContent from './TryItOutContent';
import { TryItOutProps } from '@/types/SwaggerViewer';
import UrlPath from './UrlPath';
import Buttons from './Buttons';
import { getContentExample } from './getContentExample';
import Headers from './Headers';

const TryItOut = ({
  parameters,
  request,
  method,
  activeServer,
  endpointPath,
  onResultExecute,
}: TryItOutProps) => {
  const [body, setBody] = useState<string>(
    request ? getContentExample(request) : '',
  );
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [pathParameters, setPathParameters] = useState<Record<string, string>>(
    {},
  );
  const [queryParameters, setQueryParameters] = useState<
    Record<string, string>
  >({});

  const handleRequestBody = (value: string) => {
    setBody(value);
  };

  const handleHeaders: Dispatch<SetStateAction<Record<string, string>>> = (
    headers,
  ) => {
    setHeaders(headers);
  };

  const handlePathParameters: Dispatch<
    SetStateAction<Record<string, string>>
  > = (parameters) => {
    setPathParameters(parameters);
  };

  const handleQueryParameters: Dispatch<
    SetStateAction<Record<string, string>>
  > = (parameters) => {
    setQueryParameters(parameters);
  };

  const pathParameterDefinitions =
    parameters?.filter(
      (parameter) => 'in' in parameter && parameter.in === 'path',
    ) ?? [];

  const queryParameterDefinitions =
    parameters?.filter(
      (parameter) => 'in' in parameter && parameter.in === 'query',
    ) ?? [];

  return (
    <section className="rounded-md border border-[#30363d] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363d] bg-[#0a0d12]">
        <Terminal size={12} color="#6366f1" />
        <span className="text-xs font-semibold text-[#e6edf3]">Try It Out</span>
      </div>
      <div className="bg-[#0d1117] p-3 space-y-3">
        <div>
          <div className="space-y-2">
            {pathParameterDefinitions.length > 0 && (
              <TryItOutContent
                title="Path parameters"
                parameters={pathParameterDefinitions}
                query={pathParameters}
                onQueryParameters={handlePathParameters}
              />
            )}

            {queryParameterDefinitions.length > 0 && (
              <TryItOutContent
                title="Query parameters"
                parameters={queryParameterDefinitions}
                query={queryParameters}
                onQueryParameters={handleQueryParameters}
              />
            )}

            {request && (
              <TryItOutContent
                title="Request body"
                parameters={request}
                body={body}
                onRequestBody={handleRequestBody}
              />
            )}
          </div>
        </div>

        <Headers onHeaders={handleHeaders} />

        <UrlPath
          method={method}
          activeServer={activeServer}
          endpointPath={endpointPath}
          pathParameters={pathParameters}
          queryParameters={queryParameters}
        />

        <Buttons
          activeServer={activeServer}
          pathParameters={pathParameters}
          queryParameters={queryParameters}
          endpointPath={endpointPath}
          method={method}
          headers={headers}
          body={body}
          onResultExecute={onResultExecute}
        />
      </div>
    </section>
  );
};

export default TryItOut;
