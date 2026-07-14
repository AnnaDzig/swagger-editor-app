import { RequestBodyProps } from '@/types/SwaggerViewer';
import Span from '../../Span';
import { isSchemaObject } from '../../isSchemaObject';
import Spoiler from '../Responses/Spoiler';

const RequestBody = ({ operationRequestBody }: RequestBodyProps) => {
  if (!operationRequestBody || Object.keys(operationRequestBody).length === 0) {
    return null;
  }

  const applicationType = Object.keys(
    Object.values(operationRequestBody)[1],
  ).join();

  const format = applicationType.split('/')[1];

  const content = Object.values(operationRequestBody)[1]['application/json'];

  const schema = content.schema;

  if (!isSchemaObject(schema)) {
    return null;
  }

  const example = content.example;

  const contentSchema = schema
    ? JSON.stringify(schema, null, 2)
    : 'No schema available';

  const contentExample = example
    ? JSON.stringify(example, null, 2)
    : 'No example available';

  const required = schema.required;

  const type = schema && 'type' in schema ? schema.type : 'unknown';

  return (
    <section className="flex flex-col gap-2 text-[#8b949e]">
      <h4 className="text-[10px] font-semibold uppercase tracking-widest">
        Request body
      </h4>

      <ul className="border border-[#30363D] rounded-md divide-y divide-[#30363D]">
        {Object.entries(schema.properties ?? {}).map(([name, property]) => {
          if (!isSchemaObject(property)) {
            return null;
          }

          const key = `${name}-${property.description}`;

          const isRequired = required?.includes(name);

          return (
            <li
              className="flex justify-between items-center py-2.5 px-3 even:bg-[#161B22] odd:bg-[#0D1117]"
              key={key}
            >
              <div className="flex justify-between  items-center">
                <p className="flex items-center text-[#76BBF9] min-w-30 shrink-0">
                  {name}
                </p>
                <p className="flex items-center gap-3">
                  <Span>{type}</Span>
                  <Span
                    color={isRequired ? '#ff7b72' : '#8b949e'}
                    borderColor={isRequired ? '#ff7b7228' : '#232933'}
                    bg={isRequired ? '#ff7b720e' : '#12161D'}
                  >
                    {isRequired ? 'required' : 'optional'}
                  </Span>
                  <Span
                    fontSize="12px"
                    color="#8b949e"
                    borderColor="transparent"
                    bg="transparent"
                  >
                    {property.description}
                  </Span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <Spoiler
        successFormat={format}
        contentSchema={contentSchema}
        applicationType={applicationType}
        contentExample={contentExample}
      />
    </section>
  );
};

export default RequestBody;
