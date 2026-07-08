import { EndpointDetailsProps } from '@/types/SwaggerViewer';
import Parameters from './Parameters';
import Responses from './Responses';

const EndpointDetails = ({ operation }: EndpointDetailsProps) => {
  console.log('operation', operation);

  const key = crypto.randomUUID();
  const operationDescription = operation.description;
  const operationParameters = operation.parameters;
  const operationResponses = operation.responses;

  console.log('operation: ', operation);
  return (
    <>
      <div className="flex flex-col gap-3.5 text-[#8b949e]" key={key}>
        <p className="text-[13px] mt-3">{operationDescription}</p>

        <Parameters operationParameters={operationParameters} />
        <Responses operationResponses={operationResponses} />
      </div>
    </>
  );
};

export default EndpointDetails;
