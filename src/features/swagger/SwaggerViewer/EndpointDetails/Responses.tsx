import { OpenAPIV3 } from 'openapi-types';
import Span from '../Span';
import { isResponseObject } from '../isResponseObject';
import { getResponseColor } from '../getColor';
import TryItOut from './TryItOut';

interface ResponseProps {
  operationResponses: OpenAPIV3.ResponsesObject;
}

const Responses = ({ operationResponses }: ResponseProps) => {
  console.log('operationResponses', operationResponses);

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

            const { statusColor } = getResponseColor(status);

            console.log('response', response);
            return (
              <li className="flex items-center" key={response.description}>
                <Span
                  className="border-r-0 rounded-tr-none rounded-br-none border-[#30363D]"
                  color={statusColor}
                >
                  {status}
                </Span>
                <Span
                  className="border-l-0 rounded-tl-none rounded-bl-none border-[#30363D]"
                  color="#8b949e"
                >
                  {response.description}
                </Span>
              </li>
            );
          })}
      </ul>

      <TryItOut />
    </section>
  );
};

export default Responses;
