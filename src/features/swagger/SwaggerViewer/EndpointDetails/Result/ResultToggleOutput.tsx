const ResultToggleOutput = ({
  onToggleOutput,
  toggleData,
}: {
  onToggleOutput: (value: string) => void;
  toggleData: string;
}) => {
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md border mb-2 w-fit">
      <button
        className="text-xs px-3 py-1 rounded font-medium capitalize transition-all cursor-pointer"
        style={{
          background: `${toggleData === 'editor' ? '#1C2128' : '#0D1117'}`,
          color: `${toggleData === 'editor' ? '#e6edf3' : '#6e7681'}`,
        }}
        onClick={() => onToggleOutput('editor')}
      >
        Response Body
      </button>
      <button
        className="text-xs px-3 py-1 rounded font-medium capitalize transition-all cursor-pointer"
        style={{
          background: `${toggleData === 'headers' ? '#1C2128' : '#0D1117'}`,
          color: `${toggleData === 'headers' ? '#e6edf3' : '#6e7681'}`,
        }}
        onClick={() => onToggleOutput('headers')}
      >
        Response Headers
      </button>
    </div>
  );
};

export default ResultToggleOutput;
