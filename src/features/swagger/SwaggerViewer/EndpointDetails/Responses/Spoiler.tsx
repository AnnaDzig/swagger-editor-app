import { SpoilerProps } from '@/types/SwaggerViewer';
import CodeBlock from './CodeBlock';
import SectionAccordion from './SectionAccordion';

const Spoiler = ({
  successCode,
  contentSchema,
  applicationType,
  contentExample,
}: SpoilerProps) => {
  return (
    <div className="bg-[#0D1117] border border-[#30363D] rounded-sm px-3">
      <SectionAccordion title="Response Schema" value={successCode}>
        <CodeBlock content={contentSchema} />
      </SectionAccordion>
      <SectionAccordion title="Response Example" value={applicationType}>
        <CodeBlock content={contentExample} />
      </SectionAccordion>
    </div>
  );
};

export default Spoiler;
