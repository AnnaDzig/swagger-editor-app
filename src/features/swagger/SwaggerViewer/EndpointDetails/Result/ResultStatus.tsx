import { getResponseColor } from '../../getColor';

const ResultStatus = ({
  status,
  duration,
}: {
  status: number;
  duration: number;
}) => {
  const { statusColor } = getResponseColor(status.toString());

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span
          className="flex gap-2 text-xs font-mono font-semibold uppercase"
          style={{ color: statusColor }}
        >
          <span>HTTP</span>
          <span>{status}</span>
          <span>{status === 200 || status === 201 ? 'ok' : 'failed'}</span>
        </span>
        <span className="text-[#484f58] text-[12px]"> - {duration}ms</span>
      </div>
    </div>
  );
};

export default ResultStatus;
