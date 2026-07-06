import { EndpointDetailsProps } from '@/types/SwaggerViewer';
import { isParameterObject } from './isParameterObject';
import Span from './Span';

const EndpointDetails = ({ operations }: EndpointDetailsProps) => {
  return (
    <>
      {operations.map((operation) => {
        const key = crypto.randomUUID();
        const OperationDescription = operation.operation.description;
        const OperationParameters = operation.operation.parameters;

        return (
          <div className="text-[#8b949e]" key={key}>
            <p className="text-[13px]">{OperationDescription}</p>

            <section>
              <h4 className="text-[10px] font-semibold uppercase tracking-widest">
                Parameters
              </h4>

              <ul className="border border-[#30363D] rounded-md divide-y divide-[#30363D]">
                {OperationParameters?.filter(isParameterObject).map(
                  (parameter) => (
                    <li
                      className="flex justify-between items-center py-2.5 px-3 even:bg-[#161B22] odd:bg-[#0D1117]"
                      key={parameter.name}
                    >
                      <div className="flex justify-between  items-center">
                        <p className="flex items-center text-[#76BBF9] min-w-30 shrink-0">
                          {parameter.name}
                        </p>
                        <p className="flex items-center gap-3">
                          <Span>{typeof parameter.name}</Span>
                          <Span
                            color="#8b949e"
                            borderColor="#232933"
                            bg="#12161D"
                          >
                            {parameter.required ? 'required' : 'optional'}
                          </Span>
                        </p>
                      </div>
                      <p>
                        <Span
                          color="#8b949e"
                          borderColor="#232933"
                          bg="#12161D"
                        >
                          {parameter.in}
                        </Span>
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>
        );
      })}
    </>
  );
};

export default EndpointDetails;
