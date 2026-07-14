import { Button } from '@/components/ui/button';
import { executeProxyRequest } from '@/features/api/client/proxy-client';
import { Check, LoaderCircle, Play, Terminal } from 'lucide-react';
import { useState } from 'react';
import buildRequestUrl from './buildRequestUrl';
import { ApiResult, ButtonsProps } from '@/types/SwaggerViewer';

const Buttons = ({
  activeServer,
  queryParameters,
  pathParameters,
  endpointPath,
  method,
  headers,
  body,
  onResultExecute,
  onCopyCurl,
  isCurlCopied,
}: ButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { requestUrl } = buildRequestUrl(
    activeServer,
    endpointPath,
    pathParameters,
    queryParameters,
  );

  const handleExecute = async () => {
    if (requestUrl.includes('{')) {
      alert('Please fill all path parameters.');
      return;
    }

    try {
      setIsLoading(true);

      const result = (await executeProxyRequest({
        endpointUrl: requestUrl,
        method: method.toUpperCase() as
          'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT',
        headers,
        body:
          method.toUpperCase() === 'GET' || method.toUpperCase() === 'HEAD'
            ? undefined
            : body
              ? JSON.parse(body)
              : undefined,
      })) as ApiResult;

      onResultExecute(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-1.5">
      <Button
        size="lg"
        disabled={isLoading}
        className="text-white font-semibold bg-[#12CB8E] rounded-sm hover:bg-[#1ad798] px-3 py-2 cursor-pointer disabled:opacity-70"
        onClick={handleExecute}
      >
        {isLoading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Play className="size-3 fill-current" />
        )}

        {isLoading ? 'Loading...' : 'Try it out'}
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="text-[#8b949e] font-semibold bg-transparent rounded-sm hover:text-[#b5bdc7] hover:bg-transparent px-3 py-2 border border-[#30363d] hover:border-[#595e63] cursor-pointer"
        onClick={onCopyCurl}
      >
        {isCurlCopied ? (
          <Check size={14} color="#56d364" />
        ) : (
          <Terminal size={14} />
        )}

        <span style={{ color: isCurlCopied ? '#56d364' : 'inherit' }}>
          Generate cURL
        </span>
      </Button>
    </div>
  );
};

export default Buttons;
