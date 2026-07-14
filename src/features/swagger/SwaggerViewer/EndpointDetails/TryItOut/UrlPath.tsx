import { UrlPathProps } from '@/types/SwaggerViewer';
import { getMethodColor } from '../../getColor';

const UrlPath = ({
  method,
  activeServer,
  endpointPath,
  pathParameters,
  queryParameters,
}: UrlPathProps) => {
  const { methodColor } = getMethodColor(method);

  const queryString = new URLSearchParams(
    Object.entries(queryParameters).filter(([, value]) => value.trim() !== ''),
  ).toString();

  const parsedEndpointPath = endpointPath.replace(
    /\{([^}]+)\}/g,
    (_, parameterName) => pathParameters[parameterName] ?? `{${parameterName}}`,
  );

  return (
    <div className="flex items-center gap-0 px-3 py-2 rounded-md bg-[#080B10] border border-[#30363d] font-mono text-[11px] overflow-x-auto whitespace-nowrap">
      <span className="mr-2 shrink-0" style={{ color: methodColor }}>
        {method}
      </span>
      <span className="shrink-0 text-[#484f58]">{activeServer}</span>
      <span className="shrink-0 text-[#e6edf3]">
        {parsedEndpointPath}
        {queryString && `?${queryString}`}
      </span>
    </div>
  );
};

export default UrlPath;
