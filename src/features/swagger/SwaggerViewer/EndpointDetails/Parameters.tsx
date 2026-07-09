import { ParametersProps } from '@/types/SwaggerViewer';
import Span from '../Span';
import { isParameterObject } from '../isParameterObject';

const Parameters = ({ operationParameters }: ParametersProps) => {
  return (
    <section className="flex flex-col gap-2 text-[#8b949e]">
      <h4 className="text-[10px] font-semibold uppercase tracking-widest">
        Parameters
      </h4>

      <ul className="border border-[#30363D] rounded-md divide-y divide-[#30363D]">
        {operationParameters?.filter(isParameterObject).map((parameter) => {
          console.log('parameter: ', parameter);

          const type =
            parameter.schema && 'type' in parameter.schema
              ? parameter.schema.type
              : 'unknown';

          return (
            <li
              className="flex justify-between items-center py-2.5 px-3 even:bg-[#161B22] odd:bg-[#0D1117]"
              key={parameter.name}
            >
              <div className="flex justify-between  items-center">
                <p className="flex items-center text-[#76BBF9] min-w-30 shrink-0">
                  {parameter.name}
                </p>
                <p className="flex items-center gap-3">
                  <Span>{type}</Span>
                  <Span borderColor="#232933" bg="#12161D">
                    {parameter.required ? 'required' : 'optional'}
                  </Span>
                  <Span
                    fontSize="12px"
                    color="#8b949e"
                    borderColor="transparent"
                    bg="transparent"
                  >
                    {parameter.description}
                  </Span>
                </p>
              </div>
              <p>
                <Span
                  className="text"
                  color="#8b949e"
                  borderColor="#232933"
                  bg="#12161D"
                >
                  {parameter.in}
                </Span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Parameters;
