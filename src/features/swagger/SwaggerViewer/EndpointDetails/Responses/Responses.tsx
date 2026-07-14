import Span from '../../Span';
import { isResponseObject } from '../../isResponseObject';
import { getResponseColor } from '../../getColor';
import { ResponseProps } from '@/types/SwaggerViewer';
import ResponseDetails from './ResponseDetails';

const Responses = ({ operationResponses }: ResponseProps) => {
  return (
    <section className="flex flex-col gap-2 text-[#8b949e]">
      <h4 className="text-[10px] font-semibold uppercase tracking-widest">
        Response
      </h4>

      <ul className="flex gap-2">
        {Object.entries(operationResponses)
          .filter(([, response]) => isResponseObject(response))
          .map(([status, response]) => {
            if ('$ref' in response) {
              return null;
            }

            const { statusColor, statusBgColor, statusBorderColor } =
              getResponseColor(status);

            return (
              <li key={response.description}>
                <div className="flex items-center">
                  <Span
                    className="rounded-sx border-[#30363D]"
                    color={statusColor}
                    bg={statusBgColor}
                    borderColor={statusBorderColor}
                    fontSize="12px"
                  >
                    {status}
                    <Span
                      className="border-0"
                      fontSize="12px"
                      color="#8b949e"
                      bg={statusBgColor}
                      borderColor={statusBorderColor}
                    >
                      {response.description}
                    </Span>
                  </Span>
                </div>
              </li>
            );
          })}
      </ul>

      <ResponseDetails operationResponses={operationResponses} />
    </section>
  );
};

export default Responses;
