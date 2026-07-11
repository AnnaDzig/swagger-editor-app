import { EndpointDetailsProps } from '@/types/SwaggerViewer';
import Parameters from './Parameters';
import Responses from './Responses/Responses';
import TryItOut from './TryItOut';
import RequestBody from './Request/RequestBody';

const EndpointDetails = ({ operation }: EndpointDetailsProps) => {
  const operationDescription = operation.description;
  const operationParameters = operation.parameters;
  const operationResponses = operation.responses;
  const operationRequestBody = operation.requestBody;

  return (
    <>
      <div className="flex flex-col gap-3.5 text-[#8b949e]">
        <p className="text-[13px] mt-3">{operationDescription}</p>

        {operationParameters && (
          <Parameters operationParameters={operationParameters} />
        )}

        {operationRequestBody && (
          <RequestBody operationRequestBody={operationRequestBody} />
        )}

        {operationResponses && (
          <Responses operationResponses={operationResponses} />
        )}

        <TryItOut />
      </div>
    </>
  );
};

export default EndpointDetails;
