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

  const handleQueryParameters: Dispatch<
    SetStateAction<Record<string, string>>
  > = (queryParameters) => {
    setQueryParameters(queryParameters);
  };

  console.log('parameters: ', parameters);
  console.log('headers: ', headers);
  console.log('queryParameters: ', queryParameters);

  return (
    <section className="rounded-md border border-[#30363d] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#30363d] bg-[#0a0d12]">
        <Terminal size={12} color="#6366f1" />
        <span className="text-xs font-semibold text-[#e6edf3]">Try It Out</span>
      </div>
      <div className="bg-[#0d1117] p-3 space-y-3">
        <div>
          <div className="space-y-2">
            {parameters && parameters.length > 0 && (
              <TryItOutContent
                title="Query parameters"
                parameters={parameters}
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
          queryParameters={queryParameters}
        />

        <Buttons
          activeServer={activeServer}
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
