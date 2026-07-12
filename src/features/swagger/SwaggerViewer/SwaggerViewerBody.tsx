import { Hash } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { SwaggerViewerBodyProps } from '@/types/SwaggerViewer';
import { getOperations } from './extractViewerData';
import NoEndpoints from './NoEndpoints';
import { groupByTag } from './groupByTag';
import EndpointDetails from './EndpointDetails/EndpointDetails';
import { getMethodColor } from './getColor';

const SwaggerViewerBody = ({
  activeTag,
  activeEndpoint,
  schema,
  onClearSearchField,
  onSetActiveTag,
  activeServer,
}: SwaggerViewerBodyProps) => {
  const operations = getOperations(schema);

  const query = activeEndpoint.trim().toLowerCase();
  const filteredOperations = query
    ? operations.filter(
        ({ method, path, operation }) =>
          method.toLowerCase().includes(query) ||
          path.toLowerCase().includes(query) ||
          operation.summary?.toLowerCase().includes(query),
      )
    : operations;

  if (filteredOperations.length === 0) {
    return (
      <NoEndpoints
        searchingTag={activeEndpoint}
        onClearSearchField={onClearSearchField}
        onSetActiveTag={onSetActiveTag}
      />
    );
  }

  const grouped = groupByTag(filteredOperations);

  const filteredTags = activeTag
    ? Object.entries(grouped)?.filter(([tag]) => tag === activeTag)
    : Object.entries(grouped);

  return (
    <div className="shrink-0 border-b px-4 py-3 bg-[#0b0e14] border-[#30363d]">
      <div className="flex items-center gap-3 mb-2.5 border-[#30363d]">
        <div className="flex-1 min-w-0">
          <ul className="flex flex-col gap-3 text-[#e6edf3]">
            {filteredTags?.map(([tag, operations]) => {
              return (
                <li className="flex flex-col gap-2" key={tag}>
                  <h3 className="flex items-center gap-1.5 relative after:block after:bg-[#30363d] after:w-full after:h-px ">
                    <Hash size={11} color="#6366f1" /> {tag}
                  </h3>

                  <ul className="flex flex-col gap-1.5 ">
                    {operations.map((operation, i) => {
                      const method = operation.method.toUpperCase();
                      const path = operation.path;
                      const summary = operation.operation.summary;

                      const key = `${method}-${path}`;

                      const { methodBgColor, methodBorderColor, methodColor } =
                        getMethodColor(method);

                      return (
                        <li
                          className="border border-[#30363D] rounded-md overflow-hidden"
                          key={key}
                        >
                          <Accordion type="multiple">
                            <AccordionItem className="px-0" value={`item-${i}`}>
                              <AccordionTrigger className="hover:no-underline hover:bg-[#1B1F26]">
                                <div className="flex w-full items-center justify-between pr-4 px-4">
                                  <p className="flex items-center gap-3">
                                    <span
                                      className="flex justify-center items-center h-[25] font-semibold text-[11px] px-2 py-1 min-w-13.5 tracking-wider border rounded"

                                      style={{
                                        backgroundColor: methodBgColor,
                                        borderColor: methodBorderColor,
                                        color: methodColor,
                                      }}
                                    >
                                      {method}
                                    </span>{' '}
                                    {path}
                                  </p>

                                  <p>{summary}</p>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="hover:no-underline border-t border-[#30363D] px-4">
                                <EndpointDetails
                                  operation={operation.operation}
                                  method={method}
                                  activeServer={activeServer}
                                  endpointPath={path}
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SwaggerViewerBody;
