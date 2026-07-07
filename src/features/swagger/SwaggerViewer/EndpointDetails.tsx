import { EndpointDetailsProps } from '@/types/SwaggerViewer';
import Parameters from './Parameters';

const EndpointDetails = ({ operations }: EndpointDetailsProps) => {
  return (
    <>
      {operations.map((operation) => {
        console.log('operation', operation);

        const key = crypto.randomUUID();
        const operationDescription = operation.operation.description;
        const operationParameters = operation.operation.parameters;
        const operationResponses = operation.operation.responses;

        console.log('operation: ', operation);
        console.log('operationResponses', operationResponses);

        return (
          <div className="flex flex-col gap-3.5 text-[#8b949e]" key={key}>
            <p className="text-[13px] mt-3">{operationDescription}</p>

            <Parameters operationParameters={operationParameters} />
          </div>
        );
      })}
    </>
  );
};

export default EndpointDetails;
