import { isParameterObject } from '../../isParameterObject';
import { TryItOutItemProps } from '@/types/SwaggerViewer';

const TryItOutItem = ({
  parameters,
  onQueryParameters,
  query,
}: TryItOutItemProps) => {
  return (
    <ul className="space-y-2">
      {parameters?.filter(isParameterObject).map((parameter) => {
        const type =
          parameter.schema && 'type' in parameter.schema
            ? parameter.schema.type
            : 'unknown';

        return (
          <li key={parameter.name} className="flex items-center gap-2">
            <label className="font-mono text-[11px] text-[#79c0ff] w-28 shrink-0">
              {parameter.name}
            </label>
            <input
              value={query?.[parameter.name] ?? ''}
              placeholder={parameter.description}
              className="flex-1 text-[11px] font-mono text-[#e6edf3] px-2.5 py-1.5 rounded-md border border-[#30363d] bg-[#161b22] focus:outline-none transition-all"
              onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
              onBlur={(e) => (e.target.style.borderColor = '#30363d')}
              onChange={(e) =>
                onQueryParameters?.((prevState) => ({
                  ...prevState,
                  [parameter.name]: e.target.value,
                }))
              }
            />
            <span className="font-mono text-[10px] text-[#d2a8ff] bg-[#d2a8ff0a] px-1.5 py-0.5 rounded border border-[#d2a8ff20] shrink-0">
              {type}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TryItOutItem;
