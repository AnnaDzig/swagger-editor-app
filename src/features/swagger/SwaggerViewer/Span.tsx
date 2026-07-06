import { cn } from '@/lib/utils';

import { SpanProps } from '@/types/SwaggerViewer';

const Span = ({
  children,
  className,
  fontSize = '10px',
  color = '#9B7EBF',
  borderColor = '#353046',
  bg = '#181924',
}: SpanProps) => {
  return (
    <span
      style={{
        fontSize,
        color,
        borderColor,
        backgroundColor: bg,
      }}
      className={cn(
        'flex items-center justify-center rounded border px-1.5 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Span;
