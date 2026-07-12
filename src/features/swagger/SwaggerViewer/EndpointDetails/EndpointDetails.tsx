import { EndpointDetailsProps } from '@/types/SwaggerViewer';
import Parameters from './Parameters';
import Responses from './Responses/Responses';
import TryItOut from './TryItOut/TryItOut';
import RequestBody from './Request/RequestBody';

const EndpointDetails = ({
  operation,
  method,
  activeServer,
  endpointPath,
}: EndpointDetailsProps) => {
  const operationDescription = operation.description;
  const operationParameters = operation.parameters;
  const operationResponses = operation.responses;
  const operationRequestBody = operation.requestBody;

  console.log('operation: ', operation);
  console.log('operationParameters: ', operationParameters);
  console.log('operationResponses: ', operationResponses);
  console.log('operationRequestBody: ', operationRequestBody);

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

        <TryItOut
          parameters={operationParameters}
          request={operationRequestBody}
          responses={operationResponses}
          method={method}
          activeServer={activeServer}
          endpointPath={endpointPath}
        />
      </div>
    </>
  );
};

export default EndpointDetails;
